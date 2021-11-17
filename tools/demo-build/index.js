#!/usr/bin/env node

import buildDemo from './demo-build.js'
import { files } from 'origami-tools-helpers';
import { readFile } from 'fs/promises';
import * as path from 'node:path'

const config = {} // #402-to-do: what flags and arguments should it accept? is it just brand and cwd?
config.cwd = process.cwd();

const configPath = path.join(config.cwd, 'origami.json');
try {
	const file = await readFile(configPath);
	let demosConfig;
	try {
		demosConfig = JSON.parse(file);
	} catch (error) {
		console.log(`${configPath} is not valid JSON.`);
		process.exit(1);
	}

	if (!Array.isArray(demosConfig.demos) || demosConfig.demos.length < 1) {
		console.log('No demos exist in the origami.json file. Reference https://origami.ft.com/docs/manifests/origami-json/ to configure demos in the component\'s origami.json manifest file.');
		process.exit(1);

	}

	let demoFilters;
	if (config && typeof config.demoFilter === 'string') {
		demoFilters = config.demoFilter.split(',');
	} else if (config && Array.isArray(config.demoFilter)) {
		demoFilters = config.demoFilter;
	}

	if (demoFilters) {
		const demoNames = demosConfig.demos.map(demo => demo.name);
		const noDemosMatchFilter = demoNames.every(name => !demoFilters.includes(name));
		if (noDemosMatchFilter) {
			if (demoFilters.length === 1) {
				console.log('No demos matched the given filter. Filter given was ' + demoFilters[0]);
			} else {
				console.log('No demos matched the given filters. Filters given were ' + demoFilters.join(', '));
			}
			process.exit(0);
		}
	}

} catch(e) {
	console.log(`No origami.json file found at ${configPath}`);
	process.exit(1);
}

console.log('build-demo: Starting building demos');
if (config.brand) {
	await buildDemo(config)
	// #402-to-do: is there anything needed to be done with any result from buildDemo?
} else {
	const brands = await files.getModuleBrands(config.cwd);
	for (const brand of brands) {
		const brandedConfig = Object.assign({brand}, config);
		await buildDemo(brandedConfig);
		// #402-to-do: is there anything needed to be done with any result from buildDemo?
	}
}

console.log('build-demo: Building demos complete. No errors found.');

// module.exports.watchable = true; // #402-to-do: make this watchable
