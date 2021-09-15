'use strict';

const process = require('process');
const readline = require('readline');
const { createReadStream } = require('fs');
const { fileExists} = require('../helpers/files');
const path = require('path');
const isCI = require('is-ci');

async function dotNpmignore(config) {
	const result = [];
	const npmignorePath = path.join(config.cwd, '/.npmignore');
	const exists = await fileExists(npmignorePath);

	if (exists) {
		const stream = createReadStream(npmignorePath);
		const reader = readline.createInterface({
			input: stream
		});

		let lineNumber = 0;
		for await (const line of reader) {
			const match = line.trim().match(/(main\.scss|main\.js|src\/?|demos\/?$|demos\/(?!local))/);
			if (match) {
				const filename = match[1];
				result.push({
					line: lineNumber,
					message: `${filename} should not be ignored.`
				});
			}
			lineNumber += 1;
		}
	} else {
		// We don't mind if there's no .npmignore
	}

	if (result.length > 0) {
		const message = 'Failed linting:\n\n' + result.map(r => r.message).join('\n') + '\n\nThe .npmignore file is not good';
		if (isCI) {
			const newLine = "%0A";
			for (const problem of result) {
				console.log(`::error file=.npmignore,line=${problem.line},col=1::${problem.message.replace(/\n/g, newLine)}`);
			}
		}
		const e = new Error(message);
		e.stack = '';
		throw e;
	} else {
		return result;
	}
}

module.exports = cfg => {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	return {
		title: 'Verifying your .npmignore',
		task: () => dotNpmignore(config)
	};
};
