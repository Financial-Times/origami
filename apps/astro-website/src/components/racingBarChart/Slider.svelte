<script>
	import {createEventDispatcher} from "svelte"

	const dispatch = createEventDispatcher()

	export let sliderLength
	export let currentValue

	const handleChange = e => {
		dispatch("sliderUpdate", {
			sliderValue: e.target.value,
		})
	}
</script>

<div class="slider">
	<input
		type="range"
		min="0"
		max={sliderLength}
		value={currentValue}
		class="slider"
		on:input={handleChange}
	/>
</div>

<style>
	.slider {
		width: 100%;
	}

	input[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
		width: 100%;
	}

	/***** Track Styles *****/
	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type="range"]::-webkit-slider-runnable-track {
		background: var(--o-colors-slate);
		height: 0.5rem;
	}

	/******** Firefox ********/
	input[type="range"]::-moz-range-track {
		background: var(--o-colors-slate);
		height: 0.5rem;
	}

	/***** Thumb Styles *****/
	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		margin-top: -12px; /* Centers thumb on the track */
		background-color: var(--o-colors-teal);
		height: 2rem;
		width: 1rem;
	}

	/***** Thumb Styles *****/
	/***** Firefox *****/
	input[type="range"]::-moz-range-thumb {
		border: none; /*Removes extra border that FF applies*/
		border-radius: 0; /*Removes default border-radius that FF applies*/
		background-color: var(--o-colors-teal);
		height: 2rem;
		width: 1rem;
	}

	/***** Focus Styles *****/
	/* Removes default focus */
	input[type="range"]:focus {
		outline: none;
	}

	/***** Chrome, Safari, Opera, and Edge Chromium *****/
	input[type="range"]:focus::-webkit-slider-thumb {
		border: 1px solid #053a5f;
		outline: 3px solid #053a5f;
		outline-offset: 0.125rem;
	}

	/******** Firefox ********/
	input[type="range"]:focus::-moz-range-thumb {
		border: 1px solid #053a5f;
		outline: 3px solid #053a5f;
		outline-offset: 0.125rem;
	}
</style>
