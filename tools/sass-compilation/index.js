#!/usr/bin/env node

import {$} from "zx"
import {EOL} from 'node:os'
import isCI from 'is-ci'
import camelCase from 'camelcase';
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import parseJson from 'parse-json'
import {readPackage} from "read-pkg"
import del from 'del'
import dedentTabs from "dedent-tabs"
import { createRequire } from 'node:module';
const dedent = dedentTabs.default
const require = createRequire(import.meta.url);
const sassBinary = require.resolve('sass-bin/src/sass');

let sassMainFile
try {
    sassMainFile = await readFile('./main.scss')
} catch {
    process.exit(0);
}

const name = await getComponentName()
const origamiManifest = await readOrigami()
const requiresPrimaryMixin = origamiManifest.origamiType === 'component'
const primaryMixinName = camelCase(name)
const primaryMixinErrorCode = `OBT_NO_PRIMARY-MIXIN-${primaryMixinName}`
const sassTestPath = './test-sass-compilation.scss'
const sassIncludePaths = getSassIncludePaths().map(p => `--load-path=${p}`)

let brands = await getBrands()
for (const brand of brands) {
    console.log(`Testing compilation for the ${brand} brand without calling any of the Sass API.`)
    await compilationTest(sassMainFile, {silent: true, brand: false})

    console.log(`Testing compilation for the ${brand} brand with a call to the primary mixin.`)
    await compilationTest(sassMainFile, {brand, silent: false})
}

async function compilationTest(mainSassFile, { silent, brand } = {
	silent: false,
	brand: false
}) {
	let sassData = "$system-code: \"origami-build-tools\";"
    if (brand) {
        sassData += `$o-brand: ${brand};`
    }
    sassData += mainSassFile
	if (!silent && requiresPrimaryMixin) {
		sassData += dedent`
        @if not mixin-exists('${primaryMixinName}') {
            @error '${primaryMixinErrorCode}'
        }
        @include ${primaryMixinName}()`
    }

    await writeFile(sassTestPath, sassData, 'utf-8')
	try {
        $.verbose = false
		const result = await $`${sassBinary} ${sassTestPath} --style=compressed --no-source-map ${sassIncludePaths}`
		const css = result.stdout

		if (silent && css) {
			throw new Error('CSS was output by default, without making a call to the component\'s Sass API.')
		}

	} catch (error) {
		const missingPrimaryMixin = error.message.includes(primaryMixinErrorCode)
        let errorMessage = error.message;
        if (missingPrimaryMixin) {
            errorMessage = dedent`
                Origami components require a primary mixin, in this case "${primaryMixinName}".
                See the "Create A New Origami Component" tutorial to learn how to add a primary 
                mixin to your component, or contact the Origami community on Slack in #origami-support.
                https://origami.ft.com/docs/tutorials/create-a-new-component-part-2/#primary-mixin`
        }

		if (isCI) {
			// GitHub's annotation system requires newlines to be URI-encoded
			const newLine = encodeURIComponent(EOL)
			const message = errorMessage.replace(/\n/g, newLine)
			console.error(`::error file=./main.scss,line=1,col=1::${message}`)
		} else {
            console.error(errorMessage)
        }
        process.exitCode = 1
	} finally {
        await del(sassTestPath)
    }
}

async function readOrigami() {
	return parseJson(await readFile('./origami.json', 'utf8'))
}

async function getBrands() {
	const origami = await readOrigami()
    return origami.brands || []
}

function getSassIncludePaths (cwd = process.cwd(), config = {sassIncludePaths: []}) {
	const npmPaths = [
		join('..', '..', 'node_modules'),
		'node_modules',
	];

	return [cwd].concat([
		...config.sassIncludePaths || [],
		...npmPaths
	].map(pathname => join(cwd, pathname)));
}

async function getComponentName() {
	const pkg = await readPackage()
    if (pkg) {
        const packageName = pkg.name;
        const packageNameHasNamespace = packageName.includes('/')
        if (packageNameHasNamespace) {
            return packageName.split('/').pop()
        }
        return packageName;
    }
	return '';
}
