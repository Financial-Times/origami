'use strict';

const process = require('process');
const writer = require('flush-write-stream');
const Listr = require('listr');
const ListrRenderer = require('../helpers/listr-renderer');

const files = require('../helpers/files');
const runNpmInstall = require('./run-npm-install');

module.exports = function (cfg) {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	return {
		title: 'Installing NPM components',
		task: () => {
			return new Listr([{
				title: 'Starting NPM',
				task: (task) => runNpmInstall({
					stdout: false,
					stderr: writer(function write(data, enc, cb) {
						task.title = data.toString();
						cb();
					}),
					cwd: config.cwd
				})
			}], {
				renderer: ListrRenderer,
				collapse: false,
				showSubtasks: true,
				concurrent: true
			});
		},
		skip: async function () {
			const exists = await files.packageJsonExists(config.cwd);
			if (!exists) {
				return 'No package.json found.';
			}
		}
	};
};
