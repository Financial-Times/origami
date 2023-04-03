<script lang="ts">
	import {onMount} from "svelte"
	import oLayout from "@financial-times/o-layout/main.js"
	import RacingBars from "./components/racingBar/RacingBars.svelte"
	import Header from "./components/Header.svelte"
	import Toggle from "./components/Toggle.svelte"
	import Footer from "./components/Footer.svelte"
	import {totalData, quarterlyData} from "./data/utils"

	onMount(() => {
		oLayout.init()
	})
	let dataType = "Total"
	$: data = dataType === "Quarterly" ? quarterlyData : totalData
	$: console.log({data})

	function handleToggle(e) {
		dataType = e.detail.value
	}
</script>

<div class="o-layout o-layout--landing" data-o-component="o-layout">
	<div class="o-layout__header">
		<Header />
	</div>
	<div class="o-layout__main o-layout-typography">
		<Toggle filters={["Total", "Quarterly"]} on:toggle={handleToggle} />
		<RacingBars {...totalData} />
	</div>
	<footer class="o-layout__footer">
		<Footer />
	</footer>
</div>

<style lang="scss">
	@import "@financial-times/o-layout/main";
	@include oLayout(
		$opts: (
			"layouts": (
				"landing"
			),
			"features": (
				"typography"
			)
		)
	);
	h1 {
		@include oTypographyHeading($level: 1);
	}
</style>
