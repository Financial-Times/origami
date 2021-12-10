'use strict';

const path = require('path');
const globby = require('globby');
const { readFile } = require('fs/promises');

async function constructBrowserDeps() {
	const dependencies = await globby(['node_modules/*/*/origami.json', 'node_modules/*/origami.json', 'origami.json']);
	const requiredFeatures = [];
	await Promise.all(dependencies.map(async dependency => {
		if (dependency.startsWith('/')) {
			dependency = dependency.substr(1);
		}
		const origami = JSON.parse(await readFile(path.resolve(dependency), 'utf-8'));
		if (origami.browserFeatures && origami.browserFeatures.required) {
			requiredFeatures.push(...origami.browserFeatures.required);
		}
	}));

	const features = Array.from(new Set(requiredFeatures));
	// Include the `CustomEvent` polyfill so that demos which include dev
	// dependencies work in older browsers. This is because the Origami Build
	// Service includes `o-autoinit` which requires the `CustomElement` polyfill.
	// https://github.com/Financial-Times/origami-build-tools/issues/906
	features.push('CustomEvent');
	if (features.length > 0) {
		return `https://polyfill.io/v3/polyfill.min.js?features=${features.join(',')}&flags=gated&unknown=polyfill`;
	} else {
		return 'https://polyfill.io/v3/polyfill.min.js?flags=gated&unknown=polyfill';
	}
}

module.exports = constructBrowserDeps;
