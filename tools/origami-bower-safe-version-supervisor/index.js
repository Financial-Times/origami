#!/usr/bin/env node

import process from 'node:process'
import {readPackageAsync} from 'read-pkg'
import semverExtra from 'semver-extra'
import origamiComponents from './last-versions-available-on-bower.js'
import majors from 'major-versions'
import isBounded from 'semver-bounded'
import exactVersion from 'exact-version'
import dedentTabs from 'dedent-tabs'
const dedent = dedentTabs.default

function checkDependencies(dependencies) {
	const dependenciesToDowngrade = []
	if (dependencies) {
		for (let [name, versionRange] of Object.entries(dependencies)) {
			versionRange = versionRange.trim()
			if (name in origamiComponents) {
				// Versions which end with `-bower` are only on bower and the version on npm which 
				// is compatible will be the same version number but without `-bower` on the end.
				const lastVersionAvailableOnBower = origamiComponents[name].replace('-bower', '')
				const isUnbounded = versionRange === '*' || !isBounded.range(versionRange)
				if (isUnbounded) {
					dependenciesToDowngrade.push([name, lastVersionAvailableOnBower, versionRange])
				} else {
					const isExactVersion = exactVersion(versionRange);
					if (isExactVersion) {
						if (semverExtra.gt(versionRange, lastVersionAvailableOnBower)) {
							dependenciesToDowngrade.push([name, lastVersionAvailableOnBower, versionRange])
						}
					} else {
						const versions = [lastVersionAvailableOnBower, ...majors(versionRange)].map(version => {
							return String(semverExtra.coerce(version, {
								loose: true
							}))
						})
						console.log({versions},majors(versionRange))
						const maxVersion = semverExtra.max(versions)

						if (maxVersion !== lastVersionAvailableOnBower) {
							dependenciesToDowngrade.push([name, lastVersionAvailableOnBower, versionRange])
						}
					}
				}
			}
		}
	}
	return dependenciesToDowngrade
}

async function main() {
	let {name: projectName, dependencies, devDependencies, peerDependencies} = await readPackageAsync()

	const dependenciesToDowngrade = checkDependencies(dependencies)
	const devDependenciesToDowngrade = checkDependencies(devDependencies)
	const peerDependenciesToDowngrade = checkDependencies(peerDependencies)

	if (dependenciesToDowngrade.length || devDependenciesToDowngrade.length || peerDependenciesToDowngrade.length) {
		console.error(dedent`This project ("${projectName}") is installing versions of Origami dependencies which are not available on Bower.
		This may cause build failures for this project or any projects which depend on "${projectName}" and have not yet upgraded to use the latest version of Origami.\n`)
		
		for (const [name, lastVersionAvailableOnBower, installedVersion] of [...dependenciesToDowngrade, ...devDependenciesToDowngrade, ...peerDependenciesToDowngrade]) {
			console.error(dedent`This project is installing "${name}" at version "${installedVersion}".
			The last version of "${name}" which is on both npm and bower is "${lastVersionAvailableOnBower}".
			Downgrade "${name}" to "${lastVersionAvailableOnBower}" in order to avoid build failures for your users.\n`)
		}
		
		console.error(`Run these commands to downgrade:`)
		
		for (const [name, lastVersionAvailableOnBower] of dependenciesToDowngrade) {
			console.error(`If this project is a library, use \`npm install --save-exact --save-peer "${name}@${lastVersionAvailableOnBower}"\` otherwise, use \`npm install --save-exact --save "${name}@${lastVersionAvailableOnBower}"\``)
		}
		for (const [name, lastVersionAvailableOnBower] of devDependenciesToDowngrade) {
			console.error(`npm install --save-exact --save-dev "${name}@${lastVersionAvailableOnBower}"`)
		}
		for (const [name, lastVersionAvailableOnBower] of peerDependenciesToDowngrade) {
			console.error(`npm install --save-exact --save-peer "${name}@${lastVersionAvailableOnBower}"`)
		}

		process.exitCode = 1
	}
}

main()

process.on('unhandledRejection', error => {
	console.error(error)
	process.exitCode = 1
})