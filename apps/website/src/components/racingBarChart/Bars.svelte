<script>
	import Bar from "./Bar.svelte"
	import {colors} from "./colors"
	import {barCount} from "./store"
	export let currentData
	const colorCount = colors.length
</script>

{#each currentData as { name, value, rank, version }, i (i)}
	{#if rank <= $barCount && value > 0}
		<Bar fill={colors[i % colorCount]} label={name} {value} {rank} {version} />
	{/if}
{/each}
