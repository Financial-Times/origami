import jetpack from "fs-jetpack"
import {descending} from "d3-array"

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

	const archivedReleases =
		jetpack.read(`src/content/archived-releases/${componentName}.json`, "json") ||
		[]
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
		releases: releases,
	}
	newJsonData.push(extractedData)
})

const hotnessData = getComponentHotnessSorted()
console.log(`🚀 ~ hotnessData:`, hotnessData);
jetpack.write("src/content/bar-data.json", hotnessData)
jetpack.write("src/content/component-data.json", newJsonData)

function findSupportedLanguages(componentSrcPath) {
	const jsPath =
		jetpack.exists(jetpack.path(componentSrcPath, "main.js")) && "js"
	const scssPath =
		jetpack.exists(jetpack.path(componentSrcPath, "main.scss")) && "scss"
	const tsxPath =
		jetpack.exists(jetpack.path(componentSrcPath, "src", "tsx")) && "tsx"
	return [jsPath, scssPath, tsxPath].filter(Boolean)
}

function rank(components) {
	return components
		.sort((a, b) => descending(a.value, b.value))
		.map((d, i) => ({...d, rank: i}))
}
function getComponentHotnessSorted() {
	const today = new Date().getTime()
	let data = []
	const releaseDates = []
	newJsonData.forEach(component => {
		const name = component.name
		const orderedReleases = component.releases.sort(compareSemanticVersions)

		const releases = orderedReleases.map((release, i) => {
			const modifiedRelease = {
				release: release.release,
				date: release.published_at,
				version: release.version,
				name,
			}

			return modifiedRelease
		})

		releaseDates.push(...releases)
	})

	releaseDates.sort((a, b) => new Date(a.date) - new Date(b.date))
	const firstRelease = new Date(releaseDates[0].date)
	const dates = getDates(firstRelease, new Date())
	const hotnessCounter = {}
	const componentReleases = {}
	const labels = newJsonData.map(component => component.name)
	labels.forEach(name => (hotnessCounter[name] = 0))
	dates.forEach(date => {
		const componentsWithIncreasedPopularity = releaseDates.filter(
			item => item.date === date
		)
		componentsWithIncreasedPopularity.forEach(({name, release, version}) => {
			if (!componentReleases[name]) {
				componentReleases[name] = {}
				componentReleases[name].firstRelease = date
			}
			componentReleases[name].lastUpdated = date
			componentReleases[name].release = release
			componentReleases[name].version = version
		})

		const dayInMilliseconds = 86400000

		labels.forEach(name => {
			if (!componentReleases[name]) return
			const {firstRelease, lastUpdated, release} = componentReleases[name]
			const firstReleaseMilliseconds = new Date(firstRelease).getTime()
			const timeSinceCreated =
				(today - firstReleaseMilliseconds) / dayInMilliseconds
			const timeElapsed =
				(new Date(lastUpdated).getTime() - firstReleaseMilliseconds) /
				dayInMilliseconds

			hotnessCounter[name] = calculatePopularity(
				timeSinceCreated,
				timeElapsed,
				release
			)
		})

		const componentsWithReleaseValues = labels.map(name => {
			return {
				name,
				value: hotnessCounter[name],
				version: componentReleases[name]
					? componentReleases[name].version
					: "0.0.0",
			}
		})
		data.push([date, rank(componentsWithReleaseValues)])
	})

	return {data, labels}
}

function compareSemanticVersions(a, b) {
	// 1. Split the strings into their parts.
	const a1 = a.version.split(".")
	const b1 = b.version.split(".")
	// 2. Contingency in case there's a 4th or 5th version
	const len = Math.min(a1.length, b1.length)
	// 3. Look through each version number and compare.
	for (let i = 0; i < len; i++) {
		const a2 = +a1[i] || 0
		const b2 = +b1[i] || 0

		if (a2 !== b2) {
			return a2 > b2 ? 1 : -1
		}
	}
	return b1.length - a1.length
}

function getDates(startDate, stopDate) {
	let dateArray = new Array()
	let currentDate = startDate
	while (currentDate <= stopDate) {
		dateArray.push(new Date(currentDate))
		currentDate.setDate(currentDate.getDate() + 1)
	}
	return dateArray.map(date => {
		const mm = date.getMonth() + 1 // getMonth() is zero-based
		const dd = date.getDate()
		const yyyy = date.getFullYear()
		return `${yyyy}-${(mm > 9 ? "" : "0") + mm}-${(dd > 9 ? "" : "0") + dd}`
	})
}

function calculatePopularity(timeSinceCreated, timeElapsed, release) {
	const {major, minor, patch} = release || {major: 0, minor: 0, patch: 0}
	const releasePointSum = +major + 0.25 * +minor + 0.1 * +patch
	const decayRate = 1 // 1 day
	const creationDecay = decayRate + Math.pow(timeSinceCreated, 1.8)
	const updateDecay = Math.pow(timeElapsed, 1.2)
	const newScore = releasePointSum / (creationDecay - updateDecay)
	return newScore
}
