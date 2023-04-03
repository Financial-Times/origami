import {descending} from "d3-array"
import componentData from "./component-data.json"

export const totalData = totalReleases()
export const quarterlyData = quarterlyReleases()
function totalReleases() {
	let data = []
	let formattedData = []
	let labels = []
	componentData.forEach(component => {
		labels.push(component.name)
		const orderedReleases = component.releases.sort((a, b) =>
			new Date(a.published_at) < new Date(b.published_at) ? -1 : 1
		)
		const releaseDates = orderedReleases.map((release, i) => {
			return {date: release.published_at, name: component.name, value: i + 1}
		})
		formattedData = [...formattedData, ...releaseDates]
	})

	formattedData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
	const dates = [...new Set(formattedData.map(item => item.date))]
	let releaseVersions = {}
	labels.forEach(name => (releaseVersions[name] = 0))

	dates.forEach(date => {
		const dateData = formattedData.filter(item => item.date === date)
		dateData.forEach(data => {
			releaseVersions[data.name] += 1
			releaseVersions = releaseVersions
		})
		const componentsWithReleaseValues = labels.map(name => {
			return {name, value: releaseVersions[name]}
		})

		data.push([date, rank(componentsWithReleaseValues)])
	})
	return {data, labels}
}

export function quarterlyReleases() {
	let data = []
	let formattedData = []
	const labels = totalData.labels



	componentData.forEach(component => {
		const orderedReleases = component.releases.sort((a, b) =>
			new Date(a.published_at) < new Date(b.published_at) ? -1 : 1
		)
		const releaseDates = orderedReleases.map((release, i) => {
			const date = new Date(release.published_at)
			const quarter = convertMonthToQuarter(date.getMonth())
			const year = date.getFullYear()

			return {date: release.published_at, name: component.name, quarter, year}
		})
		formattedData = [...formattedData, ...releaseDates]
	})
	formattedData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
	const dates = [...new Set(formattedData.map(item => item.date))]
	console.log(`🚀 ~ dates:`, dates);
	let releaseVersions = {}
	labels.forEach(name => (releaseVersions[name] = 0))

	// increase values if they are in the specific quarter of the year otherwise set it to 0
  // simplify whole this function so we keep it DRY
	dates.forEach(date => {
		const dateData = formattedData.filter(item => item.date === date)
		console.log(`🚀 ~ dateData:`, dateData);
		dateData.forEach(data => {
			releaseVersions[data.name] += 1
			releaseVersions = releaseVersions
		})
		const componentsWithReleaseValues = labels.map(name => {
			return {name, value: releaseVersions[name]}
		})

		data.push([date, rank(componentsWithReleaseValues)])
	})
	return {data, labels}
}

export function convertMonthToQuarter(month) {
	switch (month) {
		case 0:
		case 1:
		case 2:
			return 1
		case 3:
		case 4:
		case 5:
			return 2
		case 6:
		case 7:
		case 8:
			return 3
		case 9:
		case 10:
		case 11:
			return 4
		default:
			return 1
	}
}

function rank(components) {
	return components
		.sort((a, b) => descending(a.value, b.value))
		.map((d, i) => {
			return {...d, rank: i}
		})
}
