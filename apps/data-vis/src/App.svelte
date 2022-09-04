<script lang="ts">
	import compnentData from "./data/component-data.json"
</script>

{#each compnentData as component (component.name)}
	<p>{component.name}</p>
{/each}

<style lang="scss">
	p {
		color: oColorsByName("teal");
	}
</style>
