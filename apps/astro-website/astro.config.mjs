import {defineConfig} from "astro/config"
import {fileURLToPath} from "url"
import path, {dirname} from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://astro.build/config
export default defineConfig({
	outDir: "../../origami.ft.com",
	vite: {
		resolve: {
			alias: {
				"@": `${path.resolve(__dirname, "src")}/`,
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/global.scss";`,
				},
			},
		},
	},
	site: "https://origami.ft.com/",
	compressHTML: true
})
