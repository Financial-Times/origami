const proclaim = require('proclaim');

const eslintConfig = require('../..');

describe('eslint config', function () {
	it('has correct properties and types', function () {
		proclaim.isInstanceOf(eslintConfig, Object);
		proclaim.isInstanceOf(eslintConfig.parserOptions, Object);
		proclaim.isInstanceOf(eslintConfig.env, Object);
		proclaim.isInstanceOf(eslintConfig.rules, Object);
		proclaim.isInstanceOf(eslintConfig.globals, Object);
	});
});
