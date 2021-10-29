#!/usr/bin/env node

import path from 'node:path'
import {EOL} from 'node:os'
import isCI from 'is-ci'
import dedentTabs from "dedent-tabs"
import {globby as glob} from "globby"
import pa11y from 'pa11y'
import colors from 'colors';
const { bold } = colors;
const dedent = dedentTabs.default

const cwd = process.cwd()

const builtDemoPages = await glob(path.join(cwd, '/demos/local/*.html'), {onlyFiles: true})

const pa11yRulesToIgnore = []
// ignoring the href="#" error
pa11yRulesToIgnore.push('WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchID')
// pa11y demos are for pa11y only and may include multiple versions
// of a landmark component like o-footer
pa11yRulesToIgnore.push('landmark-one-main')
pa11yRulesToIgnore.push('landmark-no-duplicate-contentinfo')
pa11yRulesToIgnore.push('landmark-unique')
// disable https://dequeuniversity.com/rules/axe/3.5/region?application=axeAPI
pa11yRulesToIgnore.push('region')
// disable https://dequeuniversity.com/rules/axe/3.5/bypass?application=axeAPI
pa11yRulesToIgnore.push('bypass')
// pa11y demos are for pa11y only and do not have a heading
pa11yRulesToIgnore.push('page-has-heading-one')

const errors = [];
for (const page of builtDemoPages) {
	const pageAccessibilityErrors = await runPa11y(page)
	if (pageAccessibilityErrors) errors.push(pageAccessibilityErrors)
}

if (errors.length) {
	console.error(errors.join(EOL + EOL))
	process.exit(1)
}

async function runPa11y (page) {
	// Run the Pa11y tests
	const results = await pa11y(page, {
		ignore: pa11yRulesToIgnore,
		runners: ['axe']
	})

	if (results.issues.some(result => result.type === 'error')) {
		// Process and return the results
		const errors = results.issues.filter(result => result.type === 'error')
			.map(result => {
				return dedent`
				 • Error
				   ├── Message: ${result.message}
				   ├── Code: ${result.code}
				   ├── Selector: ${result.selector.replace(/\s+/g, ' ')}
				   └── Context: ${result.context.replace(/\s+/g, ' ')}`
			})
		if (isCI) {
			// GitHub's annotation system requires newlines to be URI-encoded
			const newLine = encodeURIComponent(EOL)
			errors.forEach(error => {
				const message = error.replaceAll(/\n/g, newLine)
				console.log(`::error file=${page},line=1,col=1::${message}`)
			})
		}
		return dedent`${bold(`Accessibility errors were found in ${page}`)}
				${errors.join('\n')}
				Failed Pa11y tests`
	}
}
