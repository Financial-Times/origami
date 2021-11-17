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

await del([".github/workflows/percy-*.yml", ".github/workflows/test-*.yml"])

let dotReleasePleaseManifest = {}
let releasePleaseConfig = {
	"bootstrap-sha": "fdeb43fa39a78e96b2ae082458e04da5eb618a30",
	packages: {},
}

for (let workspace of workspacePaths) {
	let percyTokenName = workspace.replace(/[/-]/g, "_").toUpperCase()

	let workspaceFilename = workspace.replaceAll("/", "-")

	let testFile = Mustache.render(testTemplate, {workspace})

	await writeFile(`.github/workflows/test-${workspaceFilename}.yml`, testFile)

	if (workspace.startsWith("components/")) {
	let pkg = await readPackage({cwd: workspace})

		let percyFile = Mustache.render(percyTemplate, {workspace, percyTokenName})
		await writeFile(
			`.github/workflows/percy-${workspaceFilename}.yml`,
			percyFile
		)
	}

	if (workspace.match(/^(components|libraries)\//)) {
		let pkg = await readPackage({cwd: workspace})
	if (pkg.private !== true) {
		dotReleasePleaseManifest[workspace] = pkg.version
		releasePleaseConfig.packages[workspace] = {}
	}
}

await writeFile(
	".release-please-manifest.json",
	JSON.stringify(dotReleasePleaseManifest)
)
await writeFile(
	"release-please-config.json",
	JSON.stringify(releasePleaseConfig, null, "\t") + "\n"
)
