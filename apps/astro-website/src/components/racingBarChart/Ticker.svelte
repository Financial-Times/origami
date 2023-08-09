<script>
	export let date
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

</script>

{#if date}
	<div class="wrapper">
			{#key month}<span>{month}</span>{/key}
		<span>,</span>
		{#key year}<span>{year}</span>{/key}
	</div>
{/if}

<style>
	.wrapper {
		position: absolute;
		bottom: 20px;
		right: 20px;
		height: 50px;
	}
	span {
		min-width: 100px;
		font-size: 42px;
	}
</style>
