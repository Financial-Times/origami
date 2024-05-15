import {context} from "@actions/github";
import core from "@actions/core";
import {$} from "zx";
import {join} from "node:path";
import {readPackage} from "read-pkg";
import * as workspaces from "./workspaces.js";

const isPullRequest = context.payload.pull_request

export async function shouldPercyRun(dirname, workspace) {
	const isDefaultBranch = context.ref.endsWith("/main")
	const isReleaseCommit = context.payload.head_commit.message.includes('chore: release main')

	if (isDefaultBranch && isReleaseCommit) {
		core.notice("This is a release commit, we do not need to run Percy again, as this should not make any visible changes.")
		return false;
	}

	if (isDefaultBranch && !isReleaseCommit) {
		core.notice("This is a commit to main, we need to run Percy to update the baseline images.")
		return true;
	}

	if (isPullRequest) {
		let baseRef = context.payload.pull_request.base.ref;
		let headRef = context.payload.pull_request.head.ref;
		$.verbose = false
		let commits = await $`git log --pretty=format:%s origin/${baseRef}...origin/${headRef}`;
		$.verbose = true
		let messages = commits.stdout.split('\n');
		for (const message of messages) {
			if (message.startsWith('fix:') || message.startsWith('fix!:') || message.startsWith('feat:') || message.startsWith('feat!:')) {
				$.verbose = false
				let {stdout: changedFiles} = await $`git diff --name-only origin/${baseRef}...origin/${headRef}`;
				$.verbose = true
				const arrayOfChangeFiles = changedFiles.split('\n')
				const effectingFiles = changedFileEffectsPercy(arrayOfChangeFiles)
				if (!effectingFiles) {
					core.notice('We are not running percy because the files that changed do not effect percy.')
					return false
				}
				const changedPackages = new Set;
				for (const file of arrayOfChangeFiles) {
					if (file) {
						const filePathParts = file.split('/');
						if (filePathParts.length > 1) {
							// We swallow errors because not every file in the monorepo is contained in a folder
							// or does not contain a package.json
							try {
								const path = join(dirname, '../', filePathParts[0], filePathParts[1])
								const pkg = await readPackage({cwd: path})
								changedPackages.add(pkg.name);
							} catch {
							}
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
						const packageDependencies = new Set(Object.keys(pkg.dependencies || []).concat(Object.keys(pkg.devDependencies || [])).concat(Object.keys(pkg.peerDependencies || [])))
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
				const packageDependencies = new Set(Object.keys(pkg.dependencies || []).concat(Object.keys(pkg.devDependencies || [])).concat(Object.keys(pkg.peerDependencies || [])))
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
	}

	core.notice('We are not running Percy because this is not a pull-request or a release commit on the default branch.')
	return false;
}

function changedFileEffectsPercy(files) {
	// any file under components that ends with .js or .scss extension
	const regex = /components.*((\.js)|(\.scss)|(\.moustache)|(\.json))/gm
	return files.find(file => regex.test(file))
}

