import sveltePreprocess from "svelte-preprocess"

export default {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		scss: {
			includePaths: ["../../node_modules"],
			prependData: `$system-code: origami;
				$o-brand: internal;
				@import "@financial-times/o-colors/main";
				@import "@financial-times/o-typography/main";`,
		},
	}),
}
