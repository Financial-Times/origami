<script lang="ts">
	import oLayout from "@financial-times/o-layout/main.js"
	import {onMount} from "svelte"
	import RacingBars from "./components/racingBar/RacingBars.svelte"
	import compnentData from "./data/component-data.json"
	import Header from "./components/Header.svelte"
	import Footer from "./components/Footer.svelte"

	onMount(() => {
		oLayout.init()
	})
</script>

<div class="o-layout o-layout--landing" data-o-component="o-layout">
	<div class="o-layout__header">
		<Header />
	</div>
	<div class="o-layout__main o-layout-typography">
		<RacingBars {compnentData} />
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
