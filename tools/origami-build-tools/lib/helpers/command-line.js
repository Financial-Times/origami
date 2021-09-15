'use strict';

const execa = require('execa');
const process = require('process');

function run(command, args, options) {
	options = options || {};
	const opts = {
		cwd: options.cwd || process.cwd(),
		preferLocal: true
	};
	if (options.localDir) {
		opts.localDir = options.localDir;
	}
	if (options && options.stdout === undefined && options.stderr === undefined) {
		opts.stdio = 'inherit';
	}
	const result = execa(command, args, opts);
	if (options && options.stdout === undefined) {
		options.stdout = process.stdout;
	}
	if (options && options.stderr === undefined) {
		options.stderr = process.stderr;
	}
	if (options.stdout && !opts.stdio) {
		result.stdout.pipe(options.stdout);
	}
	if (options.stderr && !opts.stdio) {
		result.stderr.pipe(options.stderr);
	}
	return result;
}

module.exports.run = run;
