import {defineConfig} from "astro/config"
import {fileURLToPath} from "url"
import path, {dirname} from "path"
import {redirects} from "./redirects"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://astro.build/config
export default defineConfig({
	vite: {
		resolve: {
			alias: {
				"@": `${path.resolve(__dirname, "src")}/`,
			},
		},
	},
	site: "https://origami.ft.com/",
	compressHTML: true,
	outDir: "../../origami.ft.com",
	redirects: redirects,
})
