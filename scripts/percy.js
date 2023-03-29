
import * as workspaces from "./lib/workspaces.js"
import core from "@actions/core"
import {$} from "zx"
import io from "@actions/io"
import fs from "fs"
import {context} from "@actions/github"
import {readPackage} from "read-pkg"
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const workspace = "./" + process.env.WORKSPACE

const isPullRequest = context.payload.pull_request

async function shouldPercyRun() {
	const isDefaultBranch = context.ref.endsWith("/main")
	const isChoreRelease = isPullRequest && context.payload.pull_request.title == 'chore: release main'
	if (isDefaultBranch && !isChoreRelease) {
		core.notice('This is a commit on the default branch, we need to run Percy to update the baseline images.')
		return true;
	} else if (isPullRequest) {
		let baseRef = context.payload.pull_request.base.ref;
		let headRef = context.payload.pull_request.head.ref;
		$.verbose = false
		let commits = await $`git log --pretty=format:%s origin/${baseRef}...origin/${headRef}`;
		$.verbose = true
		let messages = commits.stdout.split('\n');
		console.log({messages, commits})
		for (const message of messages) {
			if (message.startsWith('fix:') || message.startsWith('fix!:') || message.startsWith('feat:') || message.startsWith('feat!:')) {
				$.verbose = false
				let {stdout: changedFiles} = await $`git diff --name-only origin/${baseRef}...origin/${headRef}`;
				$.verbose = true
				const changedPackages = new Set;
				for (const file of changedFiles.split('\n')) {
					if (file) {
						const filePathParts = file.split('/');
						if (filePathParts.length > 1) {
							// We swallow errors because not every file in the monorepo is contained in a folder
							// or does not contain a package.json
							try {
								const path = join(__dirname, '../', filePathParts[0], filePathParts[1])
								const pkg = await readPackage({cwd:path})
								changedPackages.add(pkg.name);
							} catch {}
						}
					}
				}
				// This section figures out which packages in the monorepo are affected by any of the changed packages.
				// We look through every package in the workspaces and if they have a dependency affected by a
				// changed package, then we add that package to the list of changed packages and we start the loop again.
				let previousChangedPackagesSize = 0
				while (previousChangedPackagesSize != changedPackages.size) {
					previousChangedPackagesSize = changedPackages.size
					for (let cwd of await workspaces.paths()) {
						let pkg = await readPackage({cwd})
						const packageDependencies = new Set(Object.keys(pkg.dependencies||[]).concat(Object.keys(pkg.devDependencies||[])).concat(Object.keys(pkg.peerDependencies||[])))
						for (const dependency of packageDependencies) {
							if (changedPackages.has(dependency)) {
								changedPackages.add(pkg.name)
							}
						}
					}
				}
				let pkg = await readPackage({cwd: workspace})
				if (changedPackages.has(pkg.name)) {
					core.notice('A commit in the pull-request is a `fix` or `feat` commit - which means some user facing changes have been made. Those user facing changes are in this package. This means we need to run Percy on the pull-request.')
					return true;
				}
				const packageDependencies = new Set(Object.keys(pkg.dependencies||[]).concat(Object.keys(pkg.devDependencies||[])).concat(Object.keys(pkg.peerDependencies||[])))
				for (const dependency of packageDependencies) {
					if (changedPackages.has(dependency)) {
						core.notice('A commit in the pull-request is a `fix` or `feat` commit - which means some user facing changes have been made. Those user facing changes are in a dependency of this package. This means we need to run Percy on the pull-request.')
						core.notice(`The dependencies for this package (${pkg.name}) are: ${packageDependencies.join('\n')}`)
						core.notice(`The packages which were affected by the user facing change are: ${Array.from(changedPackages.keys()).join('\n')}`)
						return true;
					}
				}
				return false;
			}
		}
		core.notice('No commits in the pull-request are a `fix` or `feat` - which means no user facing changes have been made. This means we do not need to run Percy.')
		return false;
	} else {
		core.notice('We are not running Percy because this is not a pull-request or a commit on the default branch.')
		return false;
	}
}

try {
	if (!process.env.PERCY_TOKEN || process.env.PERCY_TOKEN == '') {
		throw new Error('The percy token is not set, please add the token in the GitHub Actions Secrets. You should be able to find the token in the project on the Origami Percy account (https://percy.io/27a07468). If a project does not exist, you should be able to create a new project (https://percy.io/organizations/27a07468/projects/new).');
	}
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
			core.notice('We are not running Percy because there are no demos for this component.')
			process.exit(0)
		}

		let npxPath = await io.which("npx", true)
		await $`"${npxPath}" npm exec -w ${workspace} demo-build`

		await generatePercySnapshots()
	}
} catch (error) {
	console.log(error);
	core.setFailed(error.message)
}

async function generatePercySnapshots() {
	let npxPath = await io.which("npx", true)
	let outputDir = `${workspace}/demos/local/`
	await $`"${npxPath}" percy snapshot ${outputDir}`
}
