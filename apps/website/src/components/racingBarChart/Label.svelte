<script>
	import {barHeight} from "./store"

	export let version
	export let label
	export let scaledValue
</script>

<g transform={`translate(${scaledValue - 20} ${$barHeight / 2})`}>
	<text font-weight="bold" dominant-baseline="middle" text-anchor="end" dy={-8}>
		{label}:
	</text>
	<text dominant-baseline="middle" text-anchor="end" dy={8}>
		v{version}
	</text>
</g>

<style>
	g {
		transition: transform 1000ms;
	}
</style>
