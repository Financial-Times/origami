const core = require("@actions/core")
const $ = require("zx").$
const io = require("@actions/io")
const fs = require("fs")
const {context} = require("@actions/github")

const workspace = "./" + process.env.WORKSPACE

const isPullRequest = context.payload.pull_request

async function shouldPercyRun() {
	const isDefaultBranch = context.ref.endsWith("/main")
	if (isDefaultBranch) {
		core.info('This is a commit on the default branch, we need to run Percy to update the baseline images.')
		return true;
	} else if (isPullRequest) {
		let baseRef = context.payload.pull_request.base.ref;
		let headRef = context.payload.pull_request.head.ref;
		let commits = await $`git log --pretty=format:%s origin/${baseRef}...origin/${headRef} --`;
		let messages = commits.stdout.split('\n');
		for (const message of messages) {
			if (message.startsWith('fix:') || message.startsWith('fix!:') || message.startsWith('feat:') || message.startsWith('feat!:')) {
				core.info('A commit in the pull-request is a `fix` or `feat` commit - which means some user facing changes have been made. This means we need to run Percy on the pull-request.')
				return true;
			}
		}
		core.info('No commits in the pull-request are a `fix` or `feat` - which means no user facing changes have been made. This means we do not need to run Percy.')
		return false;
	} else {
		core.info('We are not running Percy because this is not a pull-request or a commit on the default branch.')
		return false;
	}
}

void (async function () {
	try {
		const percyNeedsToRun = await shouldPercyRun();
		if (percyNeedsToRun) {
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
				process.exit(0)
			}

			if (componentConfig.brands) {
				for (const brand of componentConfig.brands) {
					await generateDemosFor(brand, demosConfig)
				}
			} else {
				await generateDemosFor("master", demosConfig)
			}

			await generatePercySnapshots()
		}
	} catch (error) {
		core.setFailed(error.message)
	}
})()

async function generateDemosFor(brand, demosConfig) {
	let npxPath = await io.which("npx", true)
	let outputDir = `${workspace}/demos/percy/${brand}`
	const brandSupportedDemos = demosConfig.filter(
		d => !Array.isArray(d.brands) || d.brands.includes(brand)
	)
	const demoNames = brandSupportedDemos.map(d => d.name).join(",")

	await $`"${npxPath}" npm exec -w ${workspace} obt demo --brand=${brand} --demo-filter="${demoNames}"`
	if (fs.existsSync(`${workspace}/demos/local`)) {
		await io.mkdirP(outputDir)
		await io.mv(`${workspace}/demos/local`, outputDir)
	}
}

async function generatePercySnapshots() {
	let npxPath = await io.which("npx", true)
	let outputDir = `${workspace}/demos/percy/`
	await $`"${npxPath}" percy snapshot ${outputDir}`
}
