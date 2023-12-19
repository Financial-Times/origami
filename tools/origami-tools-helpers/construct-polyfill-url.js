'use strict';

import path from 'node:path'
import { readFile } from 'node:fs/promises'
import { execa } from 'execa'
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function removeDuplicateArrayItems(array) {
	return Array.from(new Set(array))
}

const projectRoot = path.join(__dirname, '../..');

export async function constructPolyfillUrl() {
	const componentName = process.cwd().split(sep).pop();
	// Find all dependencies for the component
	const { stdout: componentsDependencies} = await execa(`npx`, ['npm', 'ls', `-w components/${componentName}`], {
		cwd: projectRoot
	})
	// Filter the list of all dependencies to find only those which are other origami components
	const origamiDependencies = componentsDependencies.split('\n').filter(line => line.includes('-> ./components/')).map(line => {
		return line.match(/\-> (?<location>.+)/).groups.location + '/origami.json'
	})
	// Include the components own origami.json file so we can find it's own features which may need to be polyfilled
	origamiDependencies.push('./origami.json');

	// Read all the origami.json files from the component and it's origami dependencies and
	// combine all their features which may need to be polyfilled into one array
	const requiredFeatures = [];
	await Promise.all(origamiDependencies.map(async dependency => {
		const origami = JSON.parse(await readFile(path.resolve(projectRoot, dependency), 'utf-8'));
		if (origami.browserFeatures && origami.browserFeatures.required) {
			requiredFeatures.push(...origami.browserFeatures.required);
		}
	}));
	const features = removeDuplicateArrayItems(requiredFeatures);

	if (features.length > 0) {
		return `https://polyfill.io/v3/polyfill.min.js?features=${features.join(',')}&flags=gated&unknown=polyfill`;
	} else {
		return 'https://polyfill.io/v3/polyfill.min.js?flags=gated&unknown=polyfill';
	}
}
