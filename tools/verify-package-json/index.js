#!/usr/bin/env node

import process from 'process'
import isCI from 'is-ci'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileExists } from 'origami-tools-helpers'
import semver from 'semver'
import { EOL } from 'node:os'
const cwd = process.argv[2] || process.cwd()

/**
 * Checks whether description conforms to the origami package.json description specification.
 * @param {any} description The value to check
 * @returns {Boolean} Whether `description` conforms to the origami package.json description specification.
 */
function validDescription(description) {
	if (typeof description === 'string' && description.trim().length > 0) {
		return true;
	} else {
		return false;
	}
}

/**
 * Checks whether keywords conforms to the origami package.json keywords specification.
 * @param {any} keywords The value to check
 * @returns {Boolean} Whether `keywords` conforms to the origami package.json keywords specification.
 */
function validKeywords(keywords) {
	if (Array.isArray(keywords)) {
		const valid = keywords.every(keyword => {
			return typeof keyword === 'string' && keyword.trim().length > 0;
		});
		return valid;
	} else {
		return false;
	}
}

/**
 * Checks whether engines conforms to the origami package.json specification.
 * @param {Object} engines The engines object
 * @returns {Boolean} Whether `engines` conforms to the origami package.json specification.
 */
function validEngines(engines) {
	if (engines && engines.npm) {
		try {
			const validSemver = semver.validRange(engines.npm);
			if (validSemver) {
				// npm 7 or newer is required for automated peer dependency install
				const minSupportedNpm = semver.minVersion(engines.npm);
				return semver.satisfies(minSupportedNpm, '^7');
			}
		} catch (error) {
			return false;
		}
	}
	return false;
}

/**
 * Checks whether browser conforms to the origami package.json browser specification.
 * @param {any} manifest The manifest to check
 * @param {string} workingDirectory The directory which contains the component to check
 * @returns {Promise<string|void>} If valid, returns undefined, otherwise returns a string which explains why it is not valid
 */
async function validJavaScriptEntryPoint(manifest, workingDirectory) {
	const mainJavaScriptExpectedPath = path.resolve(path.join(workingDirectory, '/main.js'));
	const mainJavaScriptFileExists = await fileExists(mainJavaScriptExpectedPath);
	if (mainJavaScriptFileExists) {
		if (typeof manifest.browser === 'string') {
			const browserPathIsCorrect = path.resolve(manifest.browser) === mainJavaScriptExpectedPath;
			// The file `main.js` exists and package.json.browser is set to `"main.js"`
			if (browserPathIsCorrect) {
				return undefined;
			}
		}
		// The file `main.js` exists and package.json.browser is not set to `"main.js"`
		return 'Because the file `main.js` exists, the `browser` property is required. It must have the value `"main.js"`.';
	} else {
		if (Object.hasOwnProperty.call(manifest, 'browser')) {
			// The file `main.js` not exist and package.json.browser does exist
			return 'Because the file `main.js` does not exist, the `browser` property must not be set.';
		} else {
			// The file `main.js` does not exists and package.json.browser does not exist
			return undefined;
		}
	}
}

/**
 * Checks an npm component name conforms to the origami package.json specification.
 * @param {String} name An npm component name.
 * @returns {Boolean} Whether the name parameter is valid according to origami package.json specification.
 */
function validName(name) {
	if (typeof name !== 'string') {
		return false;
	}
	if (!name.match(/^@financial-times\/[A-Za-z][A-Za-z0-9-]*$/)) {
		return false;
	}
	return true;
}

async function packageJson() {
	const result = [];
	const packageJsonPath = path.join(cwd, '/package.json');
	const exists = await fileExists(packageJsonPath);
	if (exists) {
		const file = await readFile(packageJsonPath, 'utf8');
		const packageJson = JSON.parse(file);

		if (packageJson.type !== 'module') {
			result.push('The `type` property is required. It must be the string "module".');
		}
		if (!validDescription(packageJson.description)) {
			result.push('A description property is required. It must be a string which describes the component.');
		}
		if (!validKeywords(packageJson.keywords)) {
			result.push('The keywords property is required. It must be an array. It must contain only strings which relate to the component. It can also be an empty array.');
		}
		if (!validName(packageJson.name)) {
			result.push('The name property is required. It must be within the `@financial-times` namespace and conform to the npmjs specification at https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name.');
		}
		if (!validEngines(packageJson.engines)) {
			result.push('The engines property is required. It must have the npm property set to a SemVer range which disallows versions lower than 7.0.0.');
		}

		const invalidExplanation = await validJavaScriptEntryPoint(packageJson, cwd);
		if (invalidExplanation) {
			result.push(invalidExplanation);
		}
	} else {
		result.push(`No package.json file found. To make this an origami component, create a package.json file following the format defined at: https://origami.ft.com/docs/components/code/#package-management`);
	}
	return result;
}

console.log('verify-package-json: Verifying your package.json');
let errors = await packageJson()

if(errors.length > 0) {
	const message = 'Failed linting:\n\n' + errors.join('\n') + '\n\nThe package.json file does not conform to the expected format https://origami.ft.com/docs/manifests/origami-json/';
	if (isCI) {
		const newLine = "%0A";
		console.log(`::error file=${cwd}/package.json,line=1,col=1::${message.replace(/\n/g, newLine)}`);
	} else {
		console.error(errors.join(EOL + EOL))
	}
	process.exit(1);
}

console.log('verify-package-json: No errors found.');

