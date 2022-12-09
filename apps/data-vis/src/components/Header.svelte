<script lang="ts">
	import {onMount} from "svelte"
	import oHeaderServices from "@financial-times/o-header-services/main"
	onMount(() => {
		oHeaderServices.init()
	})
	// $: if (headerService) {
	// 	oHeaderServices.init()
	// }

	const primaryNav: {label: string; url: string}[] = [
		{
			label: "Home",
			url: "https://origami.ft.com/",
		},
		{
			label: "Documentation",
			url: "https://origami.ft.com/documentation/",
		},
		{
			label: "Registry",
			url: "https://registry.origami.ft.com/components/",
		},
		{
			label: "Storybook",
			url: "https://origami.ft.com/storybook/",
		},
		{
			label: "Blog",
			url: "https://origami.ft.com/blog/",
		},
	]
</script>

<header
	class="o-header-services o-header-services--bleed"
	data-o-component="o-header-services"
>
	<div class="o-header-services__top">
		<!-- Link to a fallback nav for the core experience when using a drawer and hamburger icon. -->
		<div class="o-header-services__hamburger">
			<a
				class="o-header-services__hamburger-icon"
				href="#core-nav-fallback"
				role="button"
			>
				<span class="o-header-services__visually-hidden">
					Open primary navigation
				</span>
			</a>
		</div>
		<div class="o-header-services__logo" />
		<div class="o-header-services__title">
			<a class="o-header-services__product-name" href="/"> Origami </a>
			<span class="o-header-services__product-tagline"
				>Frontend Components & Services</span
			>
		</div>
	</div>

	<nav class="o-header-services__primary-nav" aria-label="primary">
		<ul class="o-header-services__primary-nav-list">
			{#each primaryNav as { label, url }}
				<li>
					<a href={url}>{label}</a>
				</li>
			{/each}
			<li>
				<a aria-current="page" href="https://origami.ft.com/graphs/">Graphs</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@import "@financial-times/o-header-services/main";

	@include oHeaderServices(
		$opts: (
			"types": (
				"primary-nav",
				"bleed"
			),
			"logo":
				"https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1:origami?source=origami-registry-ui&format=svg&width=55"
		)
	);
</style>
