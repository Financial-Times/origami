'use strict';
/**
* ISC License (ISC)
* =================
*
* Copyright (c) 2016, Alex Mercier <pro.alexandre.mercier@gmail.com>
*
* Permission to use, copy, modify, and/or distribute this software for any purpose
* with or without fee is hereby granted, provided that the above copyright notice
* and this permission notice appear in all copies.
*
* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
* REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
* FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
* INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
* OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
* TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
* THIS SOFTWARE.
*
* This is a version of amercier/karma-scss-preprocessor (license above), modified
* to use dart-sass instead of node-sass.
* Proposed PR upstream: https://github.com/amercier/karma-scss-preprocessor/pull/73
*/
const sass = require('sass');
const path = require('path');
const chalk = require('chalk');
const { clone, merge } = require('lodash');
const stripAnsi = require('strip-ansi');

function formattedScssMessage(error, file) {
	const filePath = !error || !error.file || error.file === 'stdin' ? file.path : error.file;
	const relativePath = path.relative(process.cwd(), filePath);

	return `${chalk.underline(relativePath)}\n` // eslint-disable-line prefer-template
	+ chalk.gray(` ${error.line}:${error.column} `)
	+ error.message
		.replace(/: "([^"]*)"\.$/, ': $1')
		.replace(/: (.*)/, `: ${chalk.yellow('$1')}`);
}

/**
* Preprocessor factory
* @param {Object} args - Config object of custom preprocessor.
* @param {Object} config - Config object of scssPreprocessor.
* @param {Object} logger - Karma's logger.
* @return {function} - the function to process a given sass file
*/
function createScssPreprocessor(args, config = {}, logger) {
	const log = logger.create('preprocessor.scss');

	// Options. See https://www.npmjs.com/package/sass for details
	const options = merge({
		sourceMap: false,
		transformPath(filepath) {
			return filepath.replace(/\.scss$/, '.css');
		},
	}, args.options || {}, config.options || {});

	return function processFile(content, file, done) {
		let result = null;

		log.debug('Processing "%s".', file.originalPath);

		// Transform file.path to .css so Karma serves it as a stylesheet
		file.path = file.originalPath.replace(/\.scss$/, '.css'); // eslint-disable-line

		// Clone the options because we need to mutate them
		const opts = clone(options);

		// Add current file's directory into include paths
		opts.includePaths = [path.dirname(file.originalPath)].concat(opts.includePaths || []);

		// Inline source maps
		if (opts.sourceMap) {
			opts.sourceMap = file.path;
			opts.omitSourceMapUrl = true;
		}

		// Compile using sass (synchronously)
		try {
			opts.file = file.originalPath;
			result = sass.renderSync(opts);
		} catch (error) {
			const message = formattedScssMessage(error, file);
			log.error('%s\n  at %s:%d', message, file.originalPath, error.line);
			error.message = stripAnsi(message);
			return done(error, null);
		}

		done(null, result.css || result);
		return undefined;
	};
}

// Inject dependencies
createScssPreprocessor.$inject = ['args', 'config.scssPreprocessor', 'logger'];

// Export preprocessor
module.exports = {
	'preprocessor:scss': ['factory', createScssPreprocessor],
};
