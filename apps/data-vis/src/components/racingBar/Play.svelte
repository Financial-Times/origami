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

<style lang="scss">
	@import "@financial-times/o-icons/main";
	.icon {
		cursor: pointer;
	}
	.play-icon {
		@include oIconsContent(
			$icon-name: "play",
			$color: oColorsByName("teal"),
			$size: 100
		);
	}

	.stop-icon {
		@include oIconsContent(
			$icon-name: "stop",
			$color: oColorsByName("slate"),
			$size: 100
		);
	}
</style>
