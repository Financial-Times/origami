<script>
	import {scaleLinear} from "d3-scale"
	import Label from "./Label.svelte"

	import {xMax, svgWidth, barHeight} from "./store"
	export let y = 0
	export let x = 0
	export let fill = ""
	export let label
	export let version
	export let value
	export let rank
	// scale width using d3
	$: scale = scaleLinear().domain([0, $xMax]).range([0, $svgWidth])
	$: scaledValue = scale(value)
</script>

<g transform={`translate(0 ${rank * $barHeight})`}>
	<rect height={$barHeight - 5} {x} {y} width={4} {fill} />
	<rect
		height={$barHeight - 5}
		{x}
		{y}
		width={scaledValue}
		{fill}
		fill-opacity={0.6}
	/>
	<Label {scaledValue} {label} {version} />
</g>

<style>
	g {
		transition: transform 700ms;
	}
	rect {
		transition: width 1000ms;
	}
</style>
