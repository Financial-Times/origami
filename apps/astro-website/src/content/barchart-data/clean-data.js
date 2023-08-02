import {descending} from "d3-array"
import componentData from "./component-data.json"

export const hotnessData = getComponentHotnessSorted()

function rank(components) {
	return components
		.sort((a, b) => descending(a.value, b.value))
		.map((d, i) => ({...d, rank: i}))
}
export function getComponentHotnessSorted() {
	const today = new Date().getTime()
	let data = []
	const releaseDates = []
	componentData.forEach(component => {
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
	const labels = componentData.map(component => component.name)
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

	// 4. We hit this if the all checked versions so far are equal
	//
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
