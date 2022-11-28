<script lang="ts">
	import Ticker from "./Ticker.svelte";
	import Bars from "./Bars.svelte"
	import {
		xMax,
		svgWidth,
		duration,
		height,
	} from "./store"
	import type {RacingBarData} from "./Props"

	export let data: RacingBarData[] = []
	export let labels: string[] = []

  const keyframeCount = data.length; // number of keyframes
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
	$: keyframeDate = frame[0];
	$: keyframeData = frame[1]
	$: currentData = labels
		.map(name => ({
			...keyframeData.find(d => d.name == name),
		}))
		.filter(d => d.name)

	$: xMax.set(Math.max(...keyframeData.map(d => d.value)))
	$: console.log($height)
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
