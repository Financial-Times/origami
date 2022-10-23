<script>
  import { getContext } from "svelte";

	import Bar from "./Bar.svelte";
  import {colors} from "./colors";
  export let barCount
	export let currentData
	// const { data } = getContext("chart");
	$: console.log(`🚀 ~ data from bars`, currentData);
  const colorCount = colors.length;

	$: data = currentData.sort((a, b) => a.rank - b.rank);

</script>

{#each data as { value, rank }, i (i)}
  {#if rank < barCount}
    <Bar y={i * 75 + 10} width={value} fill="{colors[i % colorCount]}" />
  {/if}
{/each}
