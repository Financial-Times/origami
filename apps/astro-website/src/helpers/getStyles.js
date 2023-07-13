import packageJson from "@/../package.json"

export function getStyles(components) {
	const {dependencies, peerDependencies, devDependencies} = packageJson
	const allDeps = {...dependencies, ...peerDependencies, ...devDependencies}
	const dependenciesList = Object.keys(allDeps)

	const componentsWithVersions = []

	components.forEach(component => {
		const pkg = `@financial-times/${component}`
		if (!dependenciesList.includes(pkg)) {
			throw new Error(`Package ${pkg} needs to be installed`)
		}
		const packageVersion = allDeps[pkg]
		componentsWithVersions.push(`${component}@${packageVersion}`)
	})

	const componentsQuery = componentsWithVersions.join(",")

	return `<head>
	<link
		rel="stylesheet"
		href="https://www.ft.com/__origami/service/build/v3/bundles/css?components=${componentsQuery}&brand=internal&system_code=origami-website"
	/>
</head>`
}
