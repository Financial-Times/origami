import core from "@actions/core"
import {$} from "zx"
import io from "@actions/io"
import fs from "fs"
import {context} from "@actions/github"

const workspace = "./" + process.env.WORKSPACE

const isPullRequest = context.payload.pull_request

try {
	if (!process.env.PERCY_TOKEN || process.env.PERCY_TOKEN == '') {
		throw new Error('The percy token is not set, please add the token in the GitHub Actions Secrets. You should be able to find the token in the project on the Origami Percy account (https://percy.io/27a07468). If a project does not exist, you should be able to create a new project (https://percy.io/organizations/27a07468/projects/new).');
	}
	if (isPullRequest) {
		core.exportVariable(
			"PERCY_PULL_REQUEST",
			String(context.payload.pull_request.number)
		)
		core.exportVariable("PERCY_BRANCH", context.ref)
	}

	const componentConfig = JSON.parse(
		fs.readFileSync(`${workspace}/origami.json`, "utf-8")
	)

	const demosConfig = componentConfig.demos || []

	if (demosConfig.length === 0) {
		core.notice('We are not running Percy because there are no demos for this component.')
		process.exit(0)
	}

	let npxPath = await io.which("npx", true)
	await $`"${npxPath}" npm exec -w ${workspace} demo-build`

	await generatePercySnapshots()

} catch (error) {
	console.log(error);
	core.setFailed(error.message)
}

async function generatePercySnapshots() {
	let npxPath = await io.which("npx", true)
	let outputDir = `${workspace}/demos/local/`
	await $`"${npxPath}" percy snapshot ${outputDir}`
}
