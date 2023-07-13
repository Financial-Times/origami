import fs from "fs"
import path from "path"

import packageJson from "@/../package.json"

const currentDirName = path.resolve()
const componentFolderPath = path.resolve(currentDirName, "../../components")
const origamiComponents = fs
	.readdirSync(componentFolderPath)
	.filter(fileName => isDirectory(fileName, componentFolderPath))
	.map(dir => `@financial-times/${dir}`)

function isDirectory(fileName, componentFolderPath) {
	const file = path.resolve(componentFolderPath, fileName)
	return fs.lstatSync(file).isDirectory()
}

// get origami components that site depends and generate HTML strings to plug it inside the astro components
// for DEV we will use Origami Build service (only reason being to gain performance)
// for PROD we will use compiled SASS and let Astro handle compilation
function fetchOrigamiComponents() {
	const styles = {}
	const {dependencies, peerDependencies, devDependencies} = packageJson
	const allDeps = {...dependencies, ...peerDependencies, ...devDependencies}
	const dependenciesList = Object.keys(allDeps)
	dependenciesList.forEach(dep => {
		if (isOrigamiComponent(dep)) {
			const depVersion = allDeps[dep]
			styles[dep] = generateHTML(dep, depVersion)
		}
	})
	return styles
}

function isOrigamiComponent(dep) {
	return origamiComponents.includes(dep)
}

function generateHTML(dep, depVersion) {
	const component = dep.split("@financial-times/")[1]
	return `<head>
	<link
		rel="stylesheet"
		href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=${component}@${depVersion}&brand=internal&system_code=origami-website"
	/>
</head>`
}


export const styles = fetchOrigamiComponents()
