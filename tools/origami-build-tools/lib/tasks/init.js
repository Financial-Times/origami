'use strict';

const {run} = require('../helpers/command-line');

module.exports = function () {
	return run('node', [require.resolve('create-origami-component')]);
};
