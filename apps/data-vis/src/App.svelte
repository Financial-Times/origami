<script lang="ts">
	import {onMount} from "svelte"
	import {descending} from "d3-array"
	import oLayout from "@financial-times/o-layout/main.js"
	import RacingBars from "./components/racingBar/RacingBars.svelte"
	import componentData from "./data/component-data.json"
	import Header from "./components/Header.svelte"
	import Toggle from "./components/Toggle.svelte"
	import Footer from "./components/Footer.svelte"

	onMount(() => {
		oLayout.init()
	})

	let dataType = "Quarterly"
	let data = []
	let formattedData = []
	let labels = []

	componentData.forEach(component => {
		labels.push(component.name)
		const orderedReleases = component.releases.sort((a, b) =>
			new Date(a.published_at) < new Date(b.published_at) ? -1 : 1
		)

		if (dataType == "Monthly") {
			// if dataType is monthly don't accumulate data. Instead show quarterly accumulated data
		}

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

	function rank(components) {
		return components
			.sort((a, b) => descending(a.value, b.value))
			.map((d, i) => {
				return {...d, rank: i}
			})
	}

	function handleToggle(e) {
		dataType = e.detail.value
	}
</script>

<div class="o-layout o-layout--landing" data-o-component="o-layout">
	<div class="o-layout__header">
		<Header />
	</div>
	<div class="o-layout__main o-layout-typography">
		<Toggle filters={["Total", "Quarterly"]} on:toggle={handleToggle} />
		<RacingBars {data} {labels} />
	</div>
	<footer class="o-layout__footer">
		<Footer />
	</footer>
</div>

<style lang="scss">
	@import "@financial-times/o-layout/main";
	@include oLayout(
		$opts: (
			"layouts": (
				"landing"
			),
			"features": (
				"typography"
			)
		)
	);
	h1 {
		@include oTypographyHeading($level: 1);
	}
</style>
