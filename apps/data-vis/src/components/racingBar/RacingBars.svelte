<script lang="ts">
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
		<svg height={$height}>
			<Bars {currentData} />
		</svg>
	</div>
{:else}
	<p>loading...</p>
{/if}

<style>
	div,
	svg {
		width: 100%;
	}
</style>
