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

<span
	on:click={handlePlay}
	class="icon"
	class:play-icon={showPlayButton}
	class:stop-icon={!showPlayButton}
/>

<style>
	.icon {
		cursor: pointer;
		width: 80px;
		height: 80px;
	}
	.play-icon {
		background-image: url("https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1%3Aplay?source=origami-website&width=100&tint=%230d7680");
	}

	.stop-icon {
		background-image: url("https://www.ft.com/__origami/service/image/v2/images/raw/fticon-v1%3Astop?source=origami-website&width=100&tint=%230d7680&bgcolor=%230d7680");
	}
</style>
