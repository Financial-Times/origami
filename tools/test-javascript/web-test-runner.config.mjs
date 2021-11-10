import {readdir} from "node:fs/promises"
import {join} from "node:path"
import {esbuildPlugin} from "@web/dev-server-esbuild"
import {fromRollup} from "@web/dev-server-rollup"
import _commonjs from "@rollup/plugin-commonjs"
import process from 'process'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileComponentsSassPlugin, testRunnerHtml } from "./lib/serve-component-css.js";
import yargsParser from 'yargs-parser'

const commonjs = fromRollup(_commonjs)
const __dirname = dirname(fileURLToPath(import.meta.url));

const {group} = yargsParser(process.argv.slice(2))
const components = await readdir(join(__dirname, '../../components'))

const dependenciesWhichUseCommonJS = [
	/@financial-times\/ft-date-format\/index\.js/,
	/@financial-times\/accessible-autocomplete\/dist\/accessible-autocomplete\.min\.js/,
	/fontfaceobserver\/fontfaceobserver\.standalone\.js/,
	/@babel\/runtime\/regenerator\/index\.js/,
	/lz-string\/libs\/lz-string\.js/,
	/aria-query\/lib\/index\.js/,
	/@testing-library\/user-event\/dist\/.+\.js/,
	/@testing-library\/dom\/dist\/.+\.js/,
	/pretty-format\/build\/.+\.js/,
	/ansi-styles\/index\.js/,
	/ansi-regex\/index\.js/,
	/react-is\/index\.js/,
	/react-is\/cjs\/.+\.js/,
	/aria-query\/lib\/.+\.js/,
	/aria-query\/lib\/.+\.js/,
	/prismjs\/components\/.+\.js/,
	/proclaim\/lib\/proclaim\.js/,
	/ftdomdelegate\/browser\.js/,
	// /sinon\/lib\/sinon\.js/,
	// /sinon\/lib\/sinon\/behavior\.js/,
	// /sinon\/lib\/sinon\/util\/core\/next-tick\.js/,
	// /sinon\/lib\/sinon\/util\/core\/get-next-tick\.js/,
	// /sinon\/lib\/sinon\/util\/core\/export-async-behaviors\.js/,
	// /sinon\/lib\/sinon\/util\/core\/extend\.js/,
	// /@sinonjs\/commons\/lib\/index\.js/,
	// /@sinonjs\/commons\/lib\/global\.js/,
	// /@sinonjs\/commons\/lib\/.+\.js/,
	// /util\-inspect\/index\.js/,
	// /array\-map\/index\.js/,
	// /indexof\/index\.js/,
	// /isarray\/index\.js/,
	// /foreach\/index\.js/,
	// /array-reduce\/index\.js/,
	// /object-keys\/.+\.js/,
	// /json3\/.+\.js/,
	// /type-detect\/.+\.js/,
];

export default {
	// watch: true,
	// By setting up groups, we can share this web-test-runner configuration across each component
	// When calling web-test-runner we pass the flag --group and specify the component whose tests we want to run
	// E.G. web-test-runner --group o-autocomplete
	groups: components.map(pkg => ({
		name: pkg,
		files: `test/**/*.test.js`,
	  })),
	// This tells web-test-runner to look for dependencies using the same steps that NodeJS uses
	// I.E. Traversing node_modules until the dependency is found
	// We also set `browser` to `true`, this tells web-test-runner to use the path defined in a dependencies
	// package.json.browser field if the field exists. This field is used throughout origami components.
	nodeResolve: {
		browser: true,
	},
	// When web-test-runner is running, it is running from within a components' folder
	// I.E. It is running under ./components/o-autocomplete
	// We need web-test-runner to have access to the root folder as we are within a monorepo
	// and the root folder's node_modules contains most of the dependencies that are used within components
	// If we are running under ./components/o-autocomplete/, then to get to the root folder we need to move up two directories
	// Which is why this is set to ../../
	rootDir: '../../',
	// Use our custom html which loads a css file (which will contains the components css)
	testRunnerHtml,
	plugins: [
		// Use our plugin to compile the components sass into the css which is loaded into the testRunnerHtml
		await compileComponentsSassPlugin(group),
		// Below here are custom inline plugins to make dependencies work correctly
		// The reason they are not working correctly is because we are not using webpack
		// And these projects are relying on webpack to make their bundled code work correctly when being used as JavaScript Modules
		{
			// turn lz-string UMD into a JavaScript Module
			name: "esmify-lz-string",
			transform(context) {
				if (context.path.endsWith("lz-string/libs/lz-string.js")) {
					return `const module = {}; const exports = {};\n${context.body};\n export default module.exports; export const compressToEncodedURIComponent = LZString.compressToEncodedURIComponent;`
				}
			},
		},
		{
			// turn ansi-styles UMD into a JavaScript Module
			name: "esmify-ansi-styles",
			transform(context) {
				if (context.path.endsWith("ansi-styles/index.js")) {
					return `const module = {}; const exports = {};\n${context.body};\n export default module.exports;`
				}
			},
		},
		{
			// turn react-is UMD iinto a cjs module for the commonjs plugin to compile to a JavaScript Module
			name: "esmify-react-is",
			transform(context) {
				if (
					context.path.endsWith("react-is/index.js") ||
					context.path.endsWith("react-is/cjs/react-is.development.js")
				) {
					return `const process = {env:{}};const module = {}; const exports = {};\n${context.body};\n`
				}
			},
		},
		{
			// turn prismjs UMD into a cjs module for the commonjs plugin to compile to a JavaScript Module
			name: "esmify-prismjs",
			transform(context) {
				if (context.path.endsWith("prismjs/components/prism-core.js")) {
					return `const module = {}; const exports = {};\n${context.body};\n`
				}
			},
		},
		{
			// turn proclaim UMD into a JavaScript Module
			name: "esmify-proclaim",
			transform(context) {
				if (context.path.endsWith("proclaim/lib/proclaim.js")) {
					return `const module = {}; const exports = {}; module.exports = exports;\n${context.body};\nexport default module.exports;`
				}
			},
		},
		{
			// turn ftdomdelegate UMD into a JavaScript Module
			name: "esmify-ftdomdelegate",
			transform(context) {
				if (context.path.endsWith("ftdomdelegate/browser.js")) {
					return `const module = {}; const exports = {}; module.exports = exports;\n${context.body};\nexport default module.exports;`
				}
			},
		},
		{
			// turn ftdomdelegate UMD into a JavaScript Module
			name: "esmify-fontfaceobserver",
			transform(context) {
				if (context.path.endsWith("fontfaceobserver/fontfaceobserver.standalone.js")) {
					return `const module = {}; const exports = {}; module.exports = exports;\n${context.body};\nexport default module.exports;`
				}
			},
		},
		{
			// turn @financial-times/accessible-autocomplete UMD into a JavaScript Module
			name: "esmify-@financial-times/accessible-autocomplete",
			transform(context) {
				if (context.path.endsWith("@financial-times/accessible-autocomplete/dist/accessible-autocomplete.min.js")) {
					return `const module = {}; const exports = {}; module.exports = exports;\n${context.body};\nexport default module.exports;`
				}
			},
		},
		commonjs({include: dependenciesWhichUseCommonJS}),
		esbuildPlugin({
			target: "auto",
		}),
	],
}
