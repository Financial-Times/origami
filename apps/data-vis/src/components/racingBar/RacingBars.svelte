<script lang="ts">
	import { scaleLinear } from "d3-scale";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
	import {max, min, rollup, ascending, sort, group, descending, pairs} from "d3-array"
	import type {RacingBarData} from './Props'
	import Bars from './Bars.svelte'
	import Timer from './Timer.svelte'

	export let data: RacingBarData[] = []
	export let labels: string[] = []
	// const data= Array.from(group(data, d => d.date)).sort((a, b) => ascending(a[0], b[0]))
	const duration = 30; // ms between keyframes
  const barCount = 8; // how many bars to show
  const barMargin = 4; // space between bars
  const keyframeCount = data.length; // number of keyframes

	let figureWidth = 0;
  let figureHeight = 0;
  let currentKeyframe = 0;
  let isEnabled = false;

	// setInterval(() => {
	// 	if (isEnabled) {
	// 		currentKeyframe = (currentKeyframe + 1) % keyframeCount;
	// 	}
	// }, duration);
	 // update dimensions
	$: width = figureWidth;
  $: height = figureHeight;
  $: barHeight = height / barCount - barMargin;

	const dimensions = writable({width,
    height,
    barHeight,
    barMargin
	});
  const scales = writable({});
  const barData = tweened(null, { duration });
  const xMax = tweened(null, { duration });

	// update keyframes
	$: isEnabled = currentKeyframe < keyframeCount;
	$: frameIndex = Math.min(currentKeyframe, keyframeCount - 1);
  $: frame = data[frameIndex];
  $: keyframeDate = frame[0];
  $: keyframeData = frame[1];
  $: currentData = labels.map((name) => ({
    ...keyframeData.find((d) => d.name == name),
  })).filter((d) => d.name);
	// update stores and context
	$: barData.set(currentData);
  $: dimensions.set({
    width,
    height,
    barHeight,
    barMargin,
  });
  $: xMax.set(Math.max(...keyframeData.map((d) => d.value)));
  $: scales.set({
    x: scaleLinear().domain([0, $xMax]).range([0, $dimensions.width]),
    y: scaleLinear().domain([0, barCount]).range([0, $dimensions.height]),
  });
	$: console.log({barData: $barData})
  $: chartContext = { dimensions, scales, data: barData, names: labels };
  $: setContext("chart", chartContext);

	$: console.log({currentData})
</script>

{#if data}
	<Timer
		bind:currentKeyframe
		keyframeCount={data.length}
		duration={duration}
		isEnabled={isEnabled}
		on:end="{() => (isEnabled = false)}"
	>
		<svg>
			<Bars {barCount} {currentData} />
		</svg>
	</Timer>
{/if}
<style>
	svg {
		height: 600px;
	}
</style>
