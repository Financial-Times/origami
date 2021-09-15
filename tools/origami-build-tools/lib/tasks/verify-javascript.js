'use strict';

const process = require('process');
const path = require('path');
const ESLint = require('eslint').ESLint;
const denodeify = require('util').promisify;
const deglob = denodeify(require('deglob'));
const log = require('../helpers/log');
const {fileExists} = require('../helpers/files');
const isCI = require('is-ci');

async function lint (config) {
	const hasJS = await projectHasJavaScriptFiles(config);

	if (hasJS) {
		// Get eslint config from the component directory
		const eslint = new ESLint({
			overrideConfigFile: path.join(config.cwd, '/.eslintrc.cjs'),
			useEslintrc: false
		});

		const results = await eslint.lintFiles(['**/*.js']);
		const hasError = results.find(r => r.errorCount > 0);
		const hasWarning = results.find(r => r.warningCount > 0);
		const formatter = await eslint.loadFormatter('compact');
		const resultText = formatter.format(results);
		const resultTextFormatted = resultText
			.replace('problems', 'linting errors')
			.replace('problem', 'linting error')
			.replace(new RegExp(config.cwd, 'gi'), '.')
			.replace(new RegExp(': line ', 'g'), ':')
			.replace(new RegExp(', col ', 'g'), ':')
			.replace(new RegExp(', Error', 'g'), ' Error')
			.replace(new RegExp(', Warning', 'g'), ' Warning');

		if (isCI) {
			results.forEach(result => {
				const file = result.filePath.replace(config.cwd, '');
				result.messages.forEach(issue => {
					const newLine = "%0A";
					const message = issue.message.replace(/\n/g, newLine);
					const line = issue.line;
					const column = issue.column;
					const code = issue.code;
					const severity = issue.severity === 2 ? "error" : "warning";
					if (severity === 'error') {
						console.log(`::error file=${file},line=${line},col=${column},code=${code},severity=${severity}::${message}`);
					}
				});
			});
		}
		if (hasError) {
			throw new Error('Failed linting: \n\n' + resultTextFormatted);
		}
		if (hasWarning) {
			log.secondary('Linting Warnings: \n\n' + resultTextFormatted);
		}
	}
}

function projectHasJavaScriptFiles(config) {
	const opts = {
		useGitIgnore: true,
		usePackageJson: false,
		cwd: config.cwd,
		ignore: ['node_modules']
	};

	return deglob(['**/*.js'], opts)
		.then(function (files) {
			return files.length > 0;
		});
}

module.exports = function (cfg) {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	return {
		title: 'Linting Javascript',
		task: () => lint(config),
		skip: async () => {
			const hasJS = await projectHasJavaScriptFiles(config);

			if (!hasJS) {
				return 'No Javascript files found.';
			}

			return fileExists(path.join(config.cwd, '.eslintrc.cjs')).then(exists => {
				if (!exists) {
					return `No .eslintrc.cjs file found. To enable JavaScript linting create a file at ${path.join(config.cwd, '/.eslintrc.cjs')}. Something like ${'`module.exports = { "extends": "origami-component" };`'}`;
				}
			});
		}
	};
};
