'use strict';

const Listr = require('listr');
const ListrRenderer = require('../helpers/listr-renderer');
const npmInstall = require('./install-npm');

module.exports = function (cfg) {
	cfg = cfg || {};
	const config = cfg.flags || {};
	config.cwd = config.cwd || process.cwd();

	const npmTask = npmInstall(config);


	return new Listr([npmTask], {
		renderer: ListrRenderer,
		collapse: false,
		showSubtasks: true,
		concurrent: true
	}).run();
};
