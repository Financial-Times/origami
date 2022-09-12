<script lang="ts">
	import compnentData from "./data/component-data.json"
	import {calculateGridPos} from "./utils/index"
	import Header from "./components/Header.svelte"
	let innerWidth = 0
	let innerHeight = 0
	const pathWidth = 120
	$: perRow = Math.round(innerWidth / pathWidth)
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<Header />
<div class="wrapper" width={innerWidth} height={innerHeight}>
	<svg width={innerWidth} height={innerHeight}>
		{#each compnentData as component, i (component.name)}
			<g transform={`translate(${calculateGridPos(i, perRow, pathWidth)})`}>
				<text class="component-name">{component.name}</text>
			</g>
			<p>{component.name}</p>
		{/each}
	</svg>
</div>

<style lang="scss">
	.component-name {
		@include oTypographyBody();
		fill: oColorsByName("teal");
		font-size: 0.9em;
		font-style: italic;
	}
</style>
