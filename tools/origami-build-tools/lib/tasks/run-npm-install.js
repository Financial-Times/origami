'use strict';

const commandLine = require('../helpers/command-line');
const path = require('path');

module.exports = function runNpmInstall(options = {}) {
	return commandLine.run('npm', ['install'], Object.assign({}, {
		localDir: path.join(__dirname, "../../")
	}, options));
};
