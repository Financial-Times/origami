import {globby as glob} from "globby"
import {readPackage} from "read-pkg"
import toposort from "toposort"

let pkgJson = await readPackage()
let workspaces = Array.isArray(pkgJson.workspaces)
	? pkgJson.workspaces
	: pkgJson.workspaces.packages

/**
 *
 * @returns {Promise<string[]>}
 */
export const paths = async () => {
	return glob(workspaces, {onlyDirectories: true})
}

/**
 *
 * @param {string[]=} workspaces paths of workspaces to sort
 * @returns {Promise<string[]>} toposorted workspaces
 */
export async function sort(workspaces) {
	let allWorkspaces = await paths()
	if (!workspaces) workspaces = allWorkspaces
	let names = new Set()
	let namePathMap = {}
	let pathPackageMap = {}
	let edges = []

	for (let workspace of allWorkspaces) {
		let pkg = await readPackage({cwd: workspace})
		if (workspaces.includes(workspace)) {
			names.add(pkg.name)
		}
		namePathMap[pkg.name] = workspace
		pathPackageMap[workspace] = pkg
	}

	for (let path of workspaces) {
		let pkg = pathPackageMap[path]

		let deps = Object.keys(pkg.peerDependencies || {}).filter(dep => {
			return names.has(dep)
		})

		edges.push(...deps.map(dep => [dep, pkg.name]))
	}

	return toposort.array(Array.from(names), edges).map(n => {
		return namePathMap[n]
	})
}

/**
 *
 * @param {string} workspace the workspace path
 * @returns {Promise<string[]>}
 */
export async function dependants(workspace, recurse = false) {
	let target = await readPackage({cwd: workspace})
	let workspaces = []

	for (let path of await paths()) {
		let pkg = await readPackage({cwd: path})
		if (Object.keys(pkg.peerDependencies || {}).includes(target.name)) {
			workspaces.push(path)
			if (recurse) {
				workspaces.push(...(await dependants(path)))
			}
		}
	}

	return workspaces
}
