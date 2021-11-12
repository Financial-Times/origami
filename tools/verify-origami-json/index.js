#!/usr/bin/env node

import process from 'process'
import isCI from 'is-ci'
import { EOL } from 'node:os'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileExists } from 'origami-tools-helpers'

// https://origami.ft.com/docs/manifests/origami-json/#origamitype
// "component": A front-end component that follows the component specification
// "imageset": A set of images that have an alias on the Origami Image Service
// "service": An HTTP service that follows the service specification
// "cli": A command line tool
// "library": A library that is not a front-end component
// "website": Origami websites that aren’t intended to be services
// "config": Projects that are configuration for other projects
// "example": Example and boilerplate projects
// "meta": Repository-only projects that relate to how Origami works
// null: An Origami project that does not fit any of the named categories

const cwd = process.argv[2] || process.cwd()
const origamiJsonPath = path.join(cwd, '/origami.json')
function isValidOrigamiType(origamiType) {
	switch (origamiType) {
		case "component":
		case "imageset":
		case "service":
		case "cli":
		case "library":
		case "website":
		case "config":
		case "example":
		case "meta":
		case null: {
			return true;
		}
		default:
			return false;
	}
}

function origamiJson() {
	const result = [];
	return fileExists(origamiJsonPath)
		.then(exists => {
			if (exists) {
				return readFile(origamiJsonPath, 'utf8')
					.then(file => {
						const origamiJson = JSON.parse(file);
						const componentDemos = origamiJson.demos;

						if (!isValidOrigamiType(origamiJson.origamiType)) {
							result.push('The origamiType property needs to be set to either "component", "imageset", "service", "cli", "library", "website", "config", "example", "meta", or null');
						}
						if (typeof origamiJson.origamiVersion === 'number') {
							result.push('The origamiVersion property must be a string.');
						}
						if (typeof origamiJson.origamiVersion !== 'string' || origamiJson.origamiVersion.split('.')[0] !== '2') {
							result.push('The origamiVersion property needs to be set to "2.0" or higher, this version of Origami Build tools does not support v1 of the Origami component specification.');
						}
						if (!origamiJson.support) {
							result.push('The support property must be an email or url to an issue tracker for this project');
						}
						if (!['active', 'maintained', 'deprecated', 'dead', 'experimental'].includes(origamiJson.supportStatus)) {
							result.push('The supportStatus property must be set to either "active", "maintained", "deprecated", "dead" or "experimental"');
						}

						if (componentDemos) {
							const hasExpanded = componentDemos.some(function (demo) {
								return Object.prototype.hasOwnProperty.call(demo, 'expanded');
							});

							if (hasExpanded) {
								result.push('The expanded property has been deprecated. Use the "hidden" property when a demo should not appear in the Registry.');
							}

							const hasInvalidTitle = componentDemos.some(function (demo) {
								return !(demo.title && typeof demo.title === 'string' && demo.title.trim().length > 0);
							});
							if (hasInvalidTitle) {
								result.push('All demos require a title property which is non-empty and of type "string".');
							}
						}
						return result
					});
			} else {
				result.push(`No origami.json file found. To make this an Origami component, create a file at ${path.join(cwd, '/origami.json')} following the format defined at: https://origami.ft.com/docs/manifests/origami-json/`)
				return result
			}
		});
}

console.log('verify-origami-json: Verifying your origami.json');
let errors = await origamiJson()

if(errors.length > 0) {
	const message = 'Failed linting:\n\n' + errors.join('\n') + '\n\nThe origami.json file does not conform to the expected format https://origami.ft.com/docs/manifests/origami-json/';
	if (isCI) {
		const newLine = "%0A";
		console.log(`::error file=${cwd}/origami.json,line=1,col=1::${message.replace(/\n/g, newLine)}`);
	} else {
		console.error(errors.join(EOL + EOL))
	}
	process.exit(1);
}

console.log('verify-origami-json: No errors found.');
