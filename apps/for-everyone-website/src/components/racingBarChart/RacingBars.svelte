<script>
	import Ticker from "./Ticker.svelte"
	import Bars from "./Bars.svelte"
	import Slider from "./Slider.svelte"
	import Play from "./Play.svelte"
	import {xMax, svgWidth, duration, height, barCount} from "./store"


	export let labels = []
	export let data = []

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
		<svg height="{$barCount * 60}px">
			<Bars {currentData} />
		</svg>
		<Ticker date={keyframeDate} />
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

<style>
	.wrapper,
	svg {
		position: relative;
		width: 100%;
	}

	.controls {
		display: flex;
		align-items: center;
		border: 1px solid var(--o-colors-slate);
		margin-bottom: var(--o-spacing-s8);
	}
</style>
