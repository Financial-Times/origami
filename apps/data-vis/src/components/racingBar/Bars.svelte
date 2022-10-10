<script>
  import Bar from "./Bar.svelte";
  import {colors} from "./colors.js";
  export let barCount;

  const colorCount = colors.length;
	const data = [{value: 20, rank: 1}, {value: 20, rank: 1}, {value: 20, rank: 1}, {value: 20, rank: 1}]

	let width = 0
	setInterval(() => {
		data[0].value += 8
		data[1].value += 12
		data[2].value += 10
		data[3].value += 19
		width += 10
	}, 200)

	$: if (width > 500) {
		width = 0
	}
</script>

{#each data as { value, rank }, i (i)}
  {#if rank < barCount}
    <Bar y={i * 75 + 10} width={value} rank="{rank}" fill="{colors[i % colorCount]}" />
  {/if}
{/each}
