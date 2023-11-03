#!/usr/bin/env node

import path from 'node:path'
import { setTimeout } from "node:timers/promises";
import {globby as glob} from "globby"
import AxeBuilder from '@axe-core/playwright'
import playwright from 'playwright'
import { pathToFileURL } from 'url';
import { prettyPrintAxeReport } from 'axe-result-pretty-print';

const cwd = process.cwd()

const builtDemoHtmlFiles = await glob(path.join(cwd, '/demos/local/*.html'), {onlyFiles: true})
const elementsToExclude = [".o-topper > figure > figcaption.o-topper__image-credit"];
const axeRulesToIgnore = [
// ignoring the href="#" error
// pa11y demos are for pa11y only and may include multiple versions
// of a landmark component like o-footer
'landmark-one-main',
'landmark-no-duplicate-contentinfo',
'landmark-unique',
// disable https://dequeuniversity.com/rules/axe/3.5/region?application=axeAPI
'region',
// // disable https://dequeuniversity.com/rules/axe/3.5/bypass?application=axeAPI
'bypass',
// // pa11y demos are for pa11y only and do not have a heading
'page-has-heading-one',
// FIXME audio caption - the newspaper doesn't provide these, so either can
//                       we. but in the future it would be good to remove this,
//                       and provide captions.
'audio-caption',
];

const errors = [];

const browser = await playwright.chromium.launch();
for (const file of builtDemoHtmlFiles) {
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto(pathToFileURL(file).toString());

	// We sleep for 1-second to allow for short animations to finish running
	// This is useful specifically for o-tooltip's demos which animate the opacity
	// of the tooltip and during the animation - the contrast of the text is insufficient.
	await setTimeout(1000);
	const results = await new AxeBuilder({ page }).exclude(elementsToExclude).disableRules(axeRulesToIgnore).analyze();
	prettyPrintAxeReport({
        violations: results.violations,
        url: file,
    });
	errors.push(...results.violations);
}
await browser.close();

if (errors.length) {
	console.error(`${errors.length} accessibility errors were detected.`)
	process.exit(1)
}
