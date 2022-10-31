<script lang="ts">
	import {scaleLinear} from "d3-scale"
	import Label from "./Label.svelte"

	import {xMax, svgWidth, barHeight} from "./store"
	export let y = 0
	export let x = 0
	export let fill = ""
	export let label
	export let value
	export let rank
	// scale width using d3
	$: scale = scaleLinear().domain([0, $xMax]).range([0, $svgWidth])
	$: scaledValue = scale(value)
</script>

<g transform={`translate(0 ${rank * $barHeight})`}>
	<rect height={$barHeight} {x} {y} width={4} {fill} />
	<rect
		height={$barHeight}
		{x}
		{y}
		width={scaledValue}
		{fill}
		fill-opacity={0.6}
	/>
	<Label {value} {scaledValue} {label}/>

</g>

<style lang="scss">
	g {
		transition: transform 1500ms linear;
	}
	rect {
		transition: width 1500ms;
	}
</style>
