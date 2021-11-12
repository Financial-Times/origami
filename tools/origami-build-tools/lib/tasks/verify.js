"use strict";

const Listr = require("listr");
const ListrRenderer = require("../helpers/listr-renderer");
const verifyDotNpmignoreFile = require("./verify-dot-npmignore");
const process = require("process");

module.exports = function(cfg) {
	cfg = cfg || {};
	const config = cfg.flags || {};
	config.cwd = config.cwd || process.cwd();
	return new Listr(
		[
			verifyDotNpmignoreFile(config),
		],
		{
			renderer: ListrRenderer,
			collapse: false,
			showSubtasks: true,
			concurrent: true,
		}
	).run();
};
