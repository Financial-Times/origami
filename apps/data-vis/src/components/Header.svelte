<script lang="ts">
	import {calculateGridPos} from "../utils/index"
	const paths = {
		g: "M0 0,C50 50 50 100 0 100,C-50 100 -50 50 0 0",
		pg: "M-35 0,C-25 25 25 25 35 0,C50 25 25 75 0 100,C-25 75 -50 25 -35 0",
		pg13: "M0 0,C50 40 50 70 20 100,L0 85,L-20 100,C-50 70 -50 40 0 0",
		r: "M0 0,C50 25 50 75 0 100,C-50 75 -50 25 0 0",
	}
</script>

<svg width={1000}>
	<g transform={`translate(${calculateGridPos(0, 4, 120)})`}>
		<path d={paths.g} />
		<text>P</text>
	</g>
	<g transform={`translate(${calculateGridPos(1, 4, 120)})`}>
		<path d={paths.pg} />
		<text>PG</text>
	</g>
	<g transform={`translate(${calculateGridPos(2, 4, 120)})`}>
		<path d={paths.pg13} />
		<text>PG-13</text>
	</g>
	<g transform={`translate(${calculateGridPos(3, 4, 120)})`}>
		<path d={paths.r} />
		<text>R</text>
	</g>
</svg>

<style lang="scss">
	svg {
		@include oTypographyBody();
	}
	path {
		fill: none;
		stroke: oColorsByName("black-70");
		stroke-width: 4;
	}
</style>
