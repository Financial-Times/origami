<script>
	import {slide} from "svelte/transition"

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
	$: dateContrtuct = new Date(date)
	$: year = dateContrtuct.getFullYear()
	$: month = months[dateContrtuct.getMonth()]
</script>

{#if date}
	<p>
		<span transition:slide>{month}</span>, <span transition:slide>{year}</span>
	</p>
{/if}

<style lang="scss">
	p {
		@include oTypographyBody();
		position: absolute;
		bottom: 20px;
		right: 20px;
	}
</style>
