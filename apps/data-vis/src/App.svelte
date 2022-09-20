<script lang="ts">
	import {Delaunay} from "d3-delaunay"
	import {extent, max} from "d3-array"
	import {
		lineRadial,
		curveLinearClosed,
		curveCardinalClosed,
		line,
		curveBasisClosed,
		curveBasis,
		curveBasisOpen,
	} from "d3-shape"
	import {scaleLinear} from "d3-scale"

	import compnentData from "./data/component-data.json"
	import {calculateGridPos, scaleCoordinates} from "./utils/index"
	import {dataset_dev} from "svelte/internal"

	let innerWidth = 0
	let innerHeight = 0
	const pathWidth = 200

	$: perRow = Math.round(innerWidth / pathWidth - 1)

	function renderComponentDelauney(data) {
		const majorMax = extent(data, major => major.release.major)
		const minorMax = extent(data, minor => minor.release.minor)
		const points = data.map(d => {
			const major = scaleCoordinates(+d.release.major, majorMax)
			const minor = scaleCoordinates(+d.release.minor, minorMax)
			return [major, minor]
		})
		const delaunay = Delaunay.from(points)
		return delaunay.render()
	}
	const renderRadialPath = data => {
		console.log({data})
		// const majorly = scaleLinear()
		// 	.domain([1, max(data, d => +d.release.major)])
		// 	.range([2 * Math.PI])

		// const scaleRadius = scaleLinear()
		// 	.domain([0, max(data, d => +d.release.minor)])
		// 	.range([0, 270])

		// const radial = lineRadial()
		// 	.angle(d => majorly(d.release.major))
		// 	.radius(d => scaleRadius(d.release.minor))
		// 	.curve(curveLinearClosed)

		const l = data.length
		const r = pathWidth / l / 2
		const radialData = data.map((d, i) => {
			const angle = (i / l) * 2 * Math.PI
			return [angle, r + +d]
		})
		console.log({radialData})
		const testData = [[0, r], ...radialData, [0, r]]
		const testRadial = lineRadial().curve(curveBasisClosed)

		return testRadial(testData)
	}

	function groupReleasesByMajor(data) {
		const groupedReleasesByMajorRelase = {}
		data.map(d => {
			if (groupedReleasesByMajorRelase[d.release.major]) {
				groupedReleasesByMajorRelase[d.release.major].push(d.release.minor)
			} else {
				groupedReleasesByMajorRelase[d.release.major] = [d.release.minor]
			}
		})
		const entries = Object.entries(groupedReleasesByMajorRelase)
		return entries
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<!-- <Header /> -->
<div class="wrapper" width={innerWidth}>
	<svg width={innerWidth} height={innerHeight}>
		{#if innerWidth > 0}
			{#each compnentData as component, i (component.name)}
				<g transform={`translate(${calculateGridPos(i, perRow, pathWidth)})`}>
					{#each groupReleasesByMajor(component.releases) as majorVersion, i}
						<g
							transform={`rotate(${
								i * (360 / majorVersion[1].length)
							}) transalte(${100 * i}, ${100 * i})`}
						>
							<path d={renderRadialPath(majorVersion[1])} />
						</g>
					{/each}
					<text class="component-name">{component.name}</text>
				</g>
			{/each}
		{/if}
	</svg>
</div>

<div class="wrapper" width={innerWidth}>
	<svg width={innerWidth} height={innerHeight}>
		{#if innerWidth > 0}
			{#each compnentData as component, i (component.name)}
				<g transform={`translate(${calculateGridPos(i, perRow, pathWidth)})`}>
					<path d={renderComponentDelauney(component.releases)} />
					<text class="component-name">{component.name}</text>
				</g>
			{/each}
		{/if}
	</svg>
</div>

<style lang="scss">
	.component-name {
		// @include oTypography();
		fill: oColorsByName("teal");
		font-size: 0.9em;
		font-style: italic;
	}

	path {
		fill: none;
		stroke: oColorsByName("black-70");
		stroke-width: 1;
	}
</style>
