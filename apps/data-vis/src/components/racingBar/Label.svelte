<script>
	import {barHeight} from "./store"

	export let value
	export let label
	export let scaledValue
</script>

<g transform={`translate(${scaledValue - 20} ${$barHeight / 2})`}>
	<text font-weight="bold" dominant-baseline="middle" text-anchor="end" dy={-8}>
		{label}:
	</text>
	<text dominant-baseline="middle" text-anchor="end" dy={8}>
		{value}
	</text>
</g>

<style lang="scss">
	text {
		@include oTypographyBody();
	}
	g {
		transition: transform 1000ms;
	}
</style>
