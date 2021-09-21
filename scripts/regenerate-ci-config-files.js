#!/usr/bin/env node
import * as workspaces from "./lib/workspaces.js"
import {readPackage} from "read-pkg"
import {readFile, writeFile} from "fs/promises"
import Mustache from "mustache"
import {basename} from "path"
import del from "del"

let testTemplate = await readFile("templates/test-workflow.yml", "utf-8")
let percyTemplate = await readFile("templates/percy-workflow.yml", "utf-8")
let labelerTemplate = await readFile("templates/labeler.yml", "utf-8")

let workspacePaths = await workspaces.paths()

let labelerFile = Mustache.render(labelerTemplate, {
	workspaces: workspacePaths
		.map(path => {
			let name = basename(path)
			if (name.startsWith("sass-")) {
				return null
			}
			return {
				name,
				path,
			}
		})
		.filter(Boolean),
})

await writeFile(`.github/labeler.yml`, labelerFile)

/**
 *
 * @param {string} workspace path of the workspace
 * @param {string} name name of the npm script to check for
 * @returns {Promise<boolean>}
 */
async function hasScript(workspace, name) {
	return (
		typeof (await readPackage({cwd: workspace})).scripts?.[name] == "string"
	)
}

await del([".github/workflows/percy-*.yml", ".github/workflows/test-*.yml"])

let dotReleasePleaseManifest = {}
let releasePleaseConfig = {
	"bootstrap-sha": "fdeb43fa39a78e96b2ae082458e04da5eb618a30",
	packages: {},
}

for (let workspace of workspacePaths) {
	let view = {
		lint: "",
		test: "",
		build: "",
		workspace,
		percyTokenName: workspace.replace(/[/-]/g, "_").toUpperCase(),
	}

	if (await hasScript(workspace, "lint")) {
		view.lint = `npx npm run -w ${workspace} lint`
	} else {
		view.lint = `npx npm exec -w ${workspace} -- origami-build-tools verify`
	}

	if (await hasScript(workspace, "build")) {
		// view.build = `npx npm run -w ${workspace} build`
	}

	if (await hasScript(workspace, "test")) {
		view.test = `npx npm run -w ${workspace} test`
	} else {
		view.test = `npx npm exec -w ${workspace} -- origami-build-tools test`
	}

	let workspaceFilename = workspace.replaceAll("/", "-")

	let testFile = Mustache.render(testTemplate, view)

	await writeFile(`.github/workflows/test-${workspaceFilename}.yml`, testFile)

	if (workspace.startsWith("components/")) {
		let percyFile = Mustache.render(percyTemplate, view)
		await writeFile(
			`.github/workflows/percy-${workspaceFilename}.yml`,
			percyFile
		)
	}

	if (workspace.match(/^(components|libraries)\//)) {
		let pkg = await readPackage({cwd: workspace})
		dotReleasePleaseManifest[workspace] = pkg.version
		releasePleaseConfig.packages[workspace] = {}
	}
}

await writeFile(
	".release-please-manifest.json",
	JSON.stringify(dotReleasePleaseManifest, null, 2) + "\n"
)
await writeFile(
	"release-please-config.json",
	JSON.stringify(releasePleaseConfig, null, "\t") + "\n"
)
