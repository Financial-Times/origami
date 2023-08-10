<script>
	import {createEventDispatcher} from "svelte"
	export let showPlayButton
	const dispatch = createEventDispatcher()
	const handlePlay = () => {
		dispatch("play", {
			playing: !showPlayButton,
		})
	}
</script>

<button
	aria-label="{showPlayButton ? 'Play' : 'Stop'} racing bar chart"
	on:click={handlePlay}
	class:play-icon={showPlayButton}
	class:stop-icon={!showPlayButton}
/>

<style>
	button {
		width: 80px;
		height: 80px;
		background: none;
	}
	.play-icon {
		background-image: url("https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1%3Aplay?source=origami-website&width=100&tint=%230d7680");
	}

	.stop-icon {
		background-image: url("https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1%3Astop?source=origami-website&width=100&tint=%230d7680&bgcolor=%230d7680");
	}
</style>
