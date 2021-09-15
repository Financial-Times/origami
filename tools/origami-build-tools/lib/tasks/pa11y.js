'use strict';

const path = require('path');
const isCI = require('is-ci');
const files = require('../helpers/files');
const buildDemo = require('./demo-build');

const pa11yTest = async function (config, brand) {
	const pa11y = require('pa11y');
	const src = path.join(config.cwd, '/demos/local/pa11y.html');

	// ignoring the href="#" error
	const ignore = ['WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchID'];
	// pa11y demos are for pa11y only and may include multiple versions
	// of a landmark component like o-footer
	ignore.push('landmark-one-main');
	ignore.push('landmark-no-duplicate-contentinfo');
	ignore.push('landmark-unique');
	// disable https://dequeuniversity.com/rules/axe/3.5/region?application=axeAPI
	ignore.push('region');
	// disable https://dequeuniversity.com/rules/axe/3.5/bypass?application=axeAPI
	ignore.push('bypass');
	// pa11y demos are for pa11y only and do not have a heading
	ignore.push('page-has-heading-one');

	// Run the Pa11y tests
	const results = await pa11y(src, {
		ignore,
		runners: [
			'axe'
		]
	});

	if (results.issues.some(result => result.type === 'error')) {
		// Process and return the results
		require('colors');
		const errors = results.issues.filter(result => result.type === 'error')
			.map(result => '\n' +
				' • Error: ' + result.message.white +
				'\n' +
				('   ├── ' + result.code +
					'\n' +
					'   ├── ' + result.selector.replace(/\s+/g, ' ') +
					'\n' +
					'   └── ' + result.context.replace(/\s+/g, ' ')).grey
			);
		if (isCI) {
			errors.forEach(error => {
				const newLine = "%0A";
				const message = error.replace(/\n/g, newLine);
				console.log(`::error file=demos/src/pa11y.mustache,line=1,col=1::${message}`);
			});
		}
		throw new Error(`Accessibility errors were found in demos/src/pa11y.mustache when built for ${brand}\n` + errors.join('\n') + '\nFailed Pa11y tests');
	}

	return results;
};

module.exports = function (cfg) {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	return {
		title: 'Executing Pa11y',
		task: async () => {
			const brand = config.brand;
			if (brand) {
				await buildDemo({
					brand,
					demoFilter: 'pa11y'
				});
				return pa11yTest(config, brand);
			} else {
				const brands = await files.getModuleBrands();
				const results = [];
				for (const brand of brands) {
					await buildDemo({
						brand,
						demoFilter: 'pa11y',
					});
					results.push(pa11yTest(config, brand));
				}
				return Promise.all(results);
			}
		},
		skip: async function () {
			if (config.testFilter && config.testFilter !== 'pa11y') {
				return 'Pa11y tests filtered out with --test-filter';
			}
			const demos = await files.getComponentDemos();
			const hasPa11yDemo = demos.some(d => d.name === 'pa11y');
			if (!hasPa11yDemo) {
				return `No Pa11y demo found. Create a demo with name "pa11y" to run Pa11y against this project.`;
			}
		}
	};
};
