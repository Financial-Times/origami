'use strict';

module.exports = function (cfg) {
	const karma = require('./karma');
	const compilationTests = require('./test-sass-compilation');
	const testSass = require('./test-sass');


	cfg = cfg || {};
	const config = cfg.flags || {};
	config.cwd = config.cwd || process.cwd();

	const Listr = require('listr');
	const ListrRenderer = require('../helpers/listr-renderer');

	return new Listr(
		[
			compilationTests(config),
			testSass(config),
			karma(config)
		], {
			renderer: ListrRenderer,
			collapse: false,
			showSubtasks: true,
			concurrent: true,
			exitOnError: false
		}
	).run();
};

module.exports.watchable = true;
