<script lang="ts">

	import {max, min, rollup, ascending, sort} from 'd3-array'

	import Bars from './Bars.svelte'
	export let compnentData

	// return ana array with [date, Map] format
		// date will be from earliest to latest
		// Map will be an fomrat of :
				// COMPONENT_NAME => LENGTH_OF_RELEASE
	let earliest, latest
	const componetNames = new Set(compnentData.map(d => d.name))
	compnentData.forEach(d => {
		const relaseDates = d.releases.map(release => release.published_at)
		const componentEarliestRelease = min(relaseDates)
		const componetLatestRelease = max(relaseDates)
		if (earliest === undefined || componentEarliestRelease < earliest) {
			earliest = componentEarliestRelease
		}
		if (latest === undefined || componetLatestRelease > latest) {
			latest = componetLatestRelease
		}
	});
	// const dateValues = Array.from(rollup(compnentData, ([d]) => d.value, d => +d.date, d => d.name)).map([date, data] => [new Date(date), data]).sort(([a], [b]) => ascending(a, b))
	const formatedData = compnentData.map(component => {
		const releaseDates = component.releases.map(release => release.published_at)
		return releaseDates
	})
	console.log({formatedData, earliest, latest})

</script>


<svg>
	<Bars barCount={8} />
</svg>

<style>
	svg {
		height: 600px;
	}
</style>
