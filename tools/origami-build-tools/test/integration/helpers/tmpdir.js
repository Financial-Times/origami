'use strict';

const fileExists = require('./fileExists');
const path = require('path');
const { mkdir, mkdtemp } = require('fs/promises');

/**
 * Return a path to a unique temporary directory to run integration tests in.
 * Previously `os.tmpdir` was used, but caused problems in Github actions where
 * the temporary directory did not exist.
 *
 * @param {String} prefix [''] - A prefix for the unique temporary directory created.
 * @returns {String} The path to a temporary directory for running integration tests.
 */
module.exports = async function tmpdir(prefix = '') {
	const rootTemporaryDirectory = path.join(__dirname, '../tmp');
	const exists = await fileExists(rootTemporaryDirectory);
	if (!exists) {
		await mkdir(rootTemporaryDirectory);
	}
	const uniqueTemporaryDirectory = await mkdtemp(path.join(rootTemporaryDirectory, prefix));
	return uniqueTemporaryDirectory;
};
