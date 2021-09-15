'use strict';

const process = require('process');
const { readFile } = require('fs/promises');
const path = require('path');
const isCI = require('is-ci');
const vfile = require('vfile');
const remark = require('remark');
const remarkLint = require('remark-lint');
const report = require('vfile-reporter');
const log = require('../helpers/log');
const { fileExists} = require('../helpers/files');

async function origamiJson(config) {
	// Error if there is no readme to verify.
	const uppercaseReadmePath = path.join(config.cwd, '/README.md');
	const hasUppercaseReadme = await fileExists(uppercaseReadmePath);
	const lowercaseReadmePath = path.join(config.cwd, '/readme.md');
	const hasLowercaseReadme = await fileExists(lowercaseReadmePath);
	if (!hasUppercaseReadme && !hasLowercaseReadme) {
		throw new Error('Components require a README.md with documentation.');
	}

	const readmePath = hasUppercaseReadme ? uppercaseReadmePath : lowercaseReadmePath;

	const contents = await readFile(readmePath, {
		encoding: 'utf-8',
	});

	const readme = vfile({
		path: readmePath,
		contents,
	});

	// Get remark config from the component directory
	const remarkPath = path.join(config.cwd, '/.remarkrc.cjs');
	// Dynamically require component remark configuration.
	// We allow a dynamic require as we trust the input:
	// https://github.com/Financial-Times/origami-build-tools/issues/881
	// eslint-disable-next-line import/no-dynamic-require
	const remarkConfigFile = require(remarkPath);

	const result = await remark()
		.use(remarkLint)
		.use(remarkConfigFile)
		.process(readme);


	if (result.messages.length) {
		if (isCI) {
			result.messages.forEach(issue => {
				const newLine = '%0A';
				const message = issue.message.replace(/\n/g, newLine);
				const line = issue.line;
				const column = issue.column;
				const code = issue.ruleId;
				const severity = issue.severity === 2 ? 'error' : 'warning';
				console.log(
					`::${severity} file=README.md,line=${line},col=${column},code=${code},severity=${severity}::${message}`
				);
			});
		} else {
			log.secondary(
				'README.md errors: \n\n' +
					report(result, {
						color: false,
					}).replace(new RegExp(config.cwd, 'gi'), '.')
			);
		}
	}
}

module.exports = cfg => {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	return {
		title: 'Verifying your component\'s README.md',
		task: () => origamiJson(config),
		skip: () => {
			return fileExists(path.join(config.cwd, '.remarkrc.cjs')).then(exists => {
				if (!exists) {
					return `No .remarkrc.cjs file found. To enable readme linting create a file at ${path.join(config.cwd, '/.remarkrc.cjs')}. Something like ${'`module.exports.plugins = [require("remark-preset-lint-origami-component")]`'}`;
				}
			});
		}
	};
};
