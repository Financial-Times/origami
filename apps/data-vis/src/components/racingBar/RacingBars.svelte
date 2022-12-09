<script lang="ts">
	import {descending} from "d3-array"

	import Ticker from "./Ticker.svelte"
	import Bars from "./Bars.svelte"
	import {xMax, svgWidth, duration, height} from "./store"
	import type {RacingBarData} from "./Props"

	export let compnentData

	let formatedData = []
	let data: RacingBarData[] = []
	let labels: string[] = []

	compnentData.forEach(component => {
		labels.push(component.name)
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
	labels.forEach(name => (releaseVersions[name] = 0))

	dates.forEach(date => {
		const dateData = formatedData.filter(item => item.date === date)
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

	const keyframeCount = data.length // number of keyframes
	let currentKeyframe = 0
	let isEnabled = false

	setInterval(() => {
		if (isEnabled) {
			currentKeyframe = (currentKeyframe + 1) % keyframeCount
		}
	}, $duration)
	// update keyframes
	$: isEnabled = currentKeyframe < keyframeCount
	$: frameIndex = Math.min(currentKeyframe, keyframeCount - 1)
	$: frame = data[frameIndex]
	$: keyframeDate = frame[0]
	$: keyframeData = frame[1]
	$: currentData = labels
		.map(name => ({
			...keyframeData.find(d => d.name == name),
		}))
		.filter(d => d.name)

	$: xMax.set(Math.max(...keyframeData.map(d => d.value)))
</script>

{#if data}
	<div bind:offsetWidth={$svgWidth} bind:offsetHeight={$height}>
		<svg height="50vh">
			<Bars {currentData} />
		</svg>
		<Ticker date={keyframeDate} />
	</div>
{:else}
	<p>loading...</p>
{/if}

<style>
	div,
	svg {
		position: relative;
		width: 100%;
		min-height: 600px;
	}
</style>
