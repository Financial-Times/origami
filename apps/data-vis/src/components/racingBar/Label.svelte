<script>
	import {barHeight} from './store'

	export let value
	export let label
	export let scaledValue
</script>

<g transform={`translate(${scaledValue - 20} ${$barHeight / 2})`}>
	<text dominant-baseline="middle" text-anchor="end" dy={-8}>
		{label}:
	</text>
	<text dominant-baseline="middle" text-anchor="end" dy={8}>
		{value}
	</text>
</g>


<style>
	g {
		transition: transform 1500ms linear;
	}
</style>
