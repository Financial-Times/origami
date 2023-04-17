<script lang="ts">
	import Ticker from "./Ticker.svelte"
	import Bars from "./Bars.svelte"
	import Slider from "./Slider.svelte"
	import Play from "./Play.svelte"
	import {xMax, svgWidth, duration, height, barCount} from "./store"
	import type {RacingBarData} from "./Props"

	export let labels: string[] = []
	export let data: RacingBarData[] = []
	export let dataType: string = ""

	$: keyframeCount = data.length // number of keyframes
	let currentKeyframe = 0
	let isEnabled = false
	let showPlayButton = false
	const intervalTimer = () => {
		if (isEnabled) {
			currentKeyframe = (currentKeyframe + 1) % keyframeCount
		}
		clearInterval(interval)
		interval = setInterval(intervalTimer, $duration)
	}

	let interval = setInterval(intervalTimer, $duration)

	// Set the duration of the racing bar chart to something longer for Quarterly data
	$: if (!showPlayButton) {
		if (dataType === "Quarterly") {
			duration.set(2000)
			!showPlayButton && intervalTimer()
		} else {
			duration.set(300)
			!showPlayButton && intervalTimer()
		}
	}
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

	function handleSliderUpdate(e) {
		clearInterval(interval)
		currentKeyframe = +e.detail.sliderValue
		showPlayButton = true
	}

	function handlePlayButton(e) {
		showPlayButton = e.detail.playing
		if (showPlayButton) {
			clearInterval(interval)
		} else {
			intervalTimer()
		}
	}
</script>

{#if data}
	<div class="wrapper" style="min-height: {$barCount * 60}px;" bind:offsetWidth={$svgWidth} bind:offsetHeight={$height}>
		<svg height="50vh">
			<Bars {currentData} />
		</svg>
		<Ticker date={keyframeDate} {dataType} />
	</div>

	<div class="controls">
		<Play on:play={handlePlayButton} {showPlayButton} />
		<Slider
			on:sliderUpdate={handleSliderUpdate}
			currentValue={frameIndex}
			sliderLength={data.length}
		/>
	</div>
{:else}
	<p>loading...</p>
{/if}

<style lang="scss">
	.wrapper,
	svg {
		position: relative;
		width: 100%;
	}

	.controls {
		display: flex;
		align-items: center;
		border: 1px solid oColorsByName("slate");
	}
</style>
