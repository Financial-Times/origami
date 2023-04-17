<script>
	// TODO: comeback to animation again
	export let date
	export let dataType
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	]
	$: dateConstruct = new Date(date)
	$: year = dateConstruct.getFullYear()
	$: month = months[dateConstruct.getMonth()]
	$: quarter = Math.floor(dateConstruct.getMonth() / 3) + 1

</script>

{#if date}
	<div class="wrapper">
		{#if dataType == "Quarterly"}
			{#key quarter}<span>Q{quarter}</span>{/key}
		{:else}
			{#key month}<span>{month}</span>{/key}
		{/if}
		<span>,</span>
		{#key year}<span>{year}</span>{/key}
	</div>
{/if}

<style lang="scss">
	.wrapper {
		position: absolute;
		bottom: 20px;
		right: 20px;
		height: 50px;
		span {
			min-width: 100px;
			font-size: 42px;
		}
	}
</style>
