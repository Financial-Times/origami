<script lang="ts">
	import {descending} from "d3-array"
	import RacingBars from "./components/racingBar/RacingBars.svelte"
	import compnentData from "./data/component-data.json"

	let formatedData = []
	let names = []

	compnentData.forEach(component => {
		names.push(component.name)
		const orderedReleases = component.releases.sort((a, b) =>
			new Date(a.published_at) < new Date(b.published_at) ? -1 : 1
		)
		const releaseDates = orderedReleases.map((release, i) => {
			return {date: release.published_at, name: component.name, value: i + 1}
		})
		formatedData = [...formatedData, ...releaseDates]
	})

	formatedData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))
	const dates = [...new Set(formatedData.map(item => item.date))]
	let releaseVersions = {}
	names.forEach(name => (releaseVersions[name] = 0))

	const dataByDate = []
	dates.forEach(date => {
		const dateData = formatedData.filter(item => item.date === date)
		dateData.forEach(data => {
			releaseVersions[data.name] += 1
			releaseVersions = releaseVersions
		})
		const componentsWithReleaseValues = names.map(name => {
			return {name, value: releaseVersions[name]}
		})

		dataByDate.push([date, rank(componentsWithReleaseValues)])
	})

	function rank(components) {
		return components
			.sort((a, b) => descending(a.value, b.value))
			.map((d, i) => {
				return {...d, rank: i}
			})
	}
</script>

<div>
	<RacingBars data={dataByDate} labels={names} />
</div>

<style>
	div {
		width: 80%;
		margin: 0 auto;
	}
</style>
