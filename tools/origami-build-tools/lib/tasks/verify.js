"use strict";

const Listr = require("listr");
const ListrRenderer = require("../helpers/listr-renderer");
const verifyOrigamiJsonFile = require("./verify-origami-json");
const verifyDotNpmignoreFile = require("./verify-dot-npmignore");
const verifyPackageJsonFile = require("./verify-package-json");
const verifyJavaScript = require("./verify-javascript");
const verifySass = require("./verify-sass");
const verifyReadme = require("./verify-readme");
const process = require("process");

module.exports = function(cfg) {
	cfg = cfg || {};
	const config = cfg.flags || {};
	config.cwd = config.cwd || process.cwd();
	return new Listr(
		[
			verifyDotNpmignoreFile(config),
			verifyOrigamiJsonFile(config),
			verifyPackageJsonFile(config),
			verifyReadme(config),
			verifyJavaScript(config),
			verifySass(config),
		],
		{
			renderer: ListrRenderer,
			collapse: false,
			showSubtasks: true,
			concurrent: true,
		}
	).run();
};
