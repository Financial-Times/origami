<script>
	import { createEventDispatcher } from 'svelte';
	export let filters
	const dispatch = createEventDispatcher();


	function handleClick(e) {
		dispatch('toggle', {
			value: e.target.innerText
		});
	}

</script>

<div>
	{#each filters as filter}
		<button on:click={handleClick}>{filter}</button>
	{/each}
</div>

<style lang="scss">
	button {
		&:first-child {
			border-right: none;
			border-radius: 50px 0 0 50px;
		}
		&:last-child {
			border-left: none;
			border-radius: 0 50px 50px 0;
		}
	}
</style>
