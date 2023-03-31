<script>
	// TODO: comeback to animation again
	// import {fly, slide} from "svelte/transition"

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

	// const flyIn = {y: 30, duration: 2000}
	// const flyOut = {y: -30, duration: 2000}
</script>

{#if date}
	<div class="wrapper">
		<p>
			{month}, {year}
			<!-- {#key month}<span in:fly={flyIn} out:fly={flyOut}>{month}</span>{/key}
			{#key year}<span in:fly={flyIn} out:fly={flyOut}>{year}</span>{/key} -->
		</p>
	</div>
{/if}

<style lang="scss">
	.wrapper {
		@include oTypographyBody();
		position: absolute;
		bottom: 20px;
		right: 20px;
		p {
			min-width: 100px;
			height: 50px;
			font-size: 42px;
			margin: 0;
			// span {
			// 	position: absolute;
			// }
		}
	}
</style>
