<script lang="ts">
	import {onMount} from "svelte"
	import oLayout from "@financial-times/o-layout/main.js"
	import RacingBars from "./components/racingBar/RacingBars.svelte"
	import Header from "./components/Header.svelte"
	import Toggle from "./components/Toggle.svelte"
	import Footer from "./components/Footer.svelte"
	import {totalData, quarterlyData} from "./data/utils"
	import {barCount} from "./components/racingBar/store"

	onMount(() => {
		oLayout.init()
	})
	let dataType = "Quarterly"
	$: data = dataType === "Quarterly" ? quarterlyData : totalData
	$: barCount.set(dataType === "Quarterly" ? 5 : 10)
	function handleToggle(e) {
		dataType = e.detail.value
	}
</script>

<div class="o-layout o-layout--landing" data-o-component="o-layout">
	<div class="o-layout__header">
		<Header />
	</div>
	<div class="o-layout__main o-layout-typography">
		<div class="toggle-wrapper">
			<Toggle
				label="Type of data"
				currentlyActive={dataType}
				filters={["Total", "Quarterly"]}
				on:toggle={handleToggle}
			/>
			<p>
				Origami as a project started over 9 years ago. We’ve come a long way
				since then with all sorts of new components, tools, and services. Bellow
				we have racing bar chart to show how components changed over time. You
				can observe component changes in two ways:

				<span>
					- <strong>Total data</strong> which is accumulative data and increases
					based on release numbers over time
				</span>
				<span>
					- And <strong>quarterly data</strong> which is number of releases in a
					given quarter
				</span>
			</p>
		</div>
		<RacingBars {...data} {dataType} />
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
	.toggle-wrapper {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
	}
	h1 {
		@include oTypographyHeading($level: 1);
	}
	span {
		margin-left: 10px;
		margin-top: 4px;
		display: block;
	}
</style>
