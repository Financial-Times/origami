const proclaim = require('proclaim');

const stylelintConfig = require('../..');

describe('stylelint config', function () {
	it('has correct properties and types', function () {
		proclaim.isInstanceOf(stylelintConfig, Object);
		proclaim.isInstanceOf(stylelintConfig.plugins, Object);
		proclaim.isInstanceOf(stylelintConfig.rules, Object);
	});
});
