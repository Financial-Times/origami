import {readFile,writeFile} from "node:fs/promises"
import {createRequire} from "node:module"
import {join} from "node:path"
import {$} from "zx"
import _commonjs from "@rollup/plugin-commonjs"
import camelCase from "camelcase"
import del from "del"
import process from 'process'
import parseJson from 'parse-json'

const require = createRequire(import.meta.url)
const sassBinary = require.resolve("sass-bin/src/sass")
const cwd = process.cwd()

export function testRunnerHtml(testFramework) {
	// This a modification of the default testRunnerHTML
	// We have added a link element to load the css
	// of the component being tested
	// Here is what the default testRunnerHTML looked like
	// at the time of authoring this --> https://github.com/modernweb-dev/web/blob/6c5893cc79c91e82f9aec35d3011c6e33ce878cc/packages/test-runner-core/src/server/plugins/serveTestRunnerHtmlPlugin.ts#L116
	return `<!DOCTYPE html>
    <html>
        <head>
            <link href="/main.css" rel="stylesheet">
        </head>
        <body>
            <script type="module" src="${testFramework}"></script>
        </body>
    </html>`;
}

async function readOrigami() {
	return parseJson(await readFile('./origami.json', 'utf8'))
}

async function getBrands() {
	const origami = await readOrigami()
    return origami.brands || []
}

export async function compileComponentsSassPlugin(component) {

    $.verbose = false
    let css = "/* component has no css */";
    let brand = (await getBrands())[0]
    try {
        const sassFile = await readFile("main.scss", "utf-8")
        const primaryMixinName = camelCase(component)
        const sassFileContents = `
            $system-code: "origami";
            ${brand ? `$o-brand: ${brand};` : ''}
            ${sassFile}
            @if mixin-exists('${primaryMixinName}') {
                @include ${primaryMixinName}();
            };`
        const sassTestPath = "test-main.scss"
        try {
            await writeFile(sassTestPath, sassFileContents, "utf-8")
            const result = await $ `${sassBinary} ${sassTestPath} --style=compressed --no-source-map --load-path=${cwd} --load-path=${join(cwd, "node_modules")} --load-path=${join(cwd, "../../node_modules")}`

            css = result.stdout
        } finally {
            await del(sassTestPath)
        }
    } catch {}
    return {
	    name: "sass",
        serve(context) {
            // This path comes from the link element in the above testRunnerHtml
            if (context.path === "/main.css") {
                return {
                    body: css,
                    headers: {
                        "content-type": "text/css",
                    }
                }
            }
        },
    };
}
