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
	workspaces: workspacePaths.map(path => {
		return {
			name: basename(path),
			path,
		}
	}),
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
}
