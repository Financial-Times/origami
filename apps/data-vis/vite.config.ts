import {defineConfig} from "vite"
import {svelte} from "@sveltejs/vite-plugin-svelte"
import preprocess from "svelte-preprocess"
// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		preserveSymlinks: true
	},
	plugins: [
		svelte({
			preprocess: [
				preprocess({
					scss: {
						prependData: `$system-code: origami;
				$o-brand: internal;
				$red: red;
				@import "@financial-times/o-colors/main";
				@include oColors();`,
					},
				}),
			],
		}),
	],
})
