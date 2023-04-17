<script>
	import {createEventDispatcher} from "svelte"
	export let label
	export let filters
	export let currentlyActive
	const dispatch = createEventDispatcher()

	function handleClick(e) {
		dispatch("toggle", {
			value: e.target.value,
		})
	}
</script>

<div class="o-forms-field" aria-labelledby="data-type-filters" role="group">
	<span class="o-forms-title">
		<span class="o-forms-title__main" id="data-type-filters">{label}</span>
	</span>
	<span class="o-forms-input o-forms-input--radio-box">
		<span class="o-forms-input--radio-box__container">
			{#each filters as filter}
				<label for="radio-{filter}">
					<input
						on:change={handleClick}
						id="radio-{filter}"
						type="radio"
						name="positive"
						value={filter}
						checked={currentlyActive === filter}
					/>
					<span class="o-forms-input__label">{filter}</span>
				</label>
			{/each}
		</span>
	</span>
</div>

<style lang="scss">
	@import "@financial-times/o-forms/main";

	@include oForms(
		$opts: (
			"elements": (
				"radio-box"
			)
		)
	);
</style>
