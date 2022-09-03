import jetpack from "fs-jetpack"

const componentsPath = jetpack.path("..", "..", "components")
const components = jetpack.cwd(componentsPath).find({
	matching: "*",
	directories: true,
	recursive: false,
	files: false,
})
const newJsonData = []
components.forEach(async dir => {
	const jsonPath = jetpack.path(componentsPath, dir, "package.json")
	const origamiJsonPath = jetpack.path(componentsPath, dir, "origami.json")
	const localJsonData = jetpack.read(jsonPath, "json")
	const localOrigamiJsonData = jetpack.read(origamiJsonPath, "json")
	const componentName = localJsonData.name.split("/")[1]
	console.log(componentName)
	const extractedData = {
		name: componentName,
		url: localJsonData.homepage,
		description: localJsonData.description,
		version: localJsonData.version,
		brands: localOrigamiJsonData.brands,
		languages: findSupportedLanguages(jetpack.path(componentsPath, dir)),
		peerDependencies: localJsonData.peerDependencies,
		devDependencies: localJsonData.devDependencies,
		dependencies: localJsonData.dependencies,
	}
	newJsonData.push(extractedData)
	const archivedReleases =
		jetpack.read(`src/data/archived-releases/${componentName}.json`, "json") || []
	const changeLogPath = jetpack.path(componentsPath, dir, "CHANGELOG.md")
	const changeLogData = jetpack
		.read(changeLogPath, "utf8")
		.match(/(\[\d+\.\d+\.\d+\])|(\(\d{4}-\d{2}-\d{2}\))/g)
	const newReleaseData = []
	for (let i = 0; i < changeLogData.length; i += 2) {
		const version = changeLogData[i].replace(/[\[\]]/g, "")
		const date = changeLogData[i + 1].replace(/[\(\)]/g, "")
		newReleaseData.push({
			tag_name: version,
			published_at: date,
		})
	}
	const releases = [...newReleaseData, ...archivedReleases].map(release => {
		const versionNumber = release.tag_name.match(/\d+\.\d+(\.\d+|)/)[0]
		return {
			release: {
				major: versionNumber.split(".")[0],
				minor: versionNumber.split(".")[1],
				patch: versionNumber.split(".")[2],
			},
			version: versionNumber,
			published_at: release.published_at.split("T")[0],
		}
	})
	jetpack.write(`src/data/release-data/${componentName}.json`, releases)
})

jetpack.write("src/data/component-data.json", newJsonData)

function findSupportedLanguages(componentSrcPath) {
	const jsPath =
		jetpack.exists(jetpack.path(componentSrcPath, "main.js")) && "js"
	const scssPath =
		jetpack.exists(jetpack.path(componentSrcPath, "main.scss")) && "scss"
	const tsxPath =
		jetpack.exists(jetpack.path(componentSrcPath, "src", "tsx")) && "tsx"
	return [jsPath, scssPath, tsxPath].filter(Boolean)
}
