/* eslint-env mocha */
'use strict';

const sinon = require('sinon');
const fileHelpers = require('../../../lib/helpers/files');
const { getBaseKarmaConfig } = require('../../../config/karma.config');
const proclaim = require('proclaim');
const path = require('path');
const process = require('process');

describe('base karma config', () => {
	const mockName = 'o-karma-test';
	const mockPrimaryMixinName = 'oKarmaTest';
	const mockScss = `@mixin ${mockPrimaryMixinName} {
		body {
			background-color: hotpink;
		}
	};`;

	beforeEach(() => {
		const getComponentNameMock = sinon.stub(fileHelpers, 'getComponentName');
		const readIfExistsMock = sinon.stub(fileHelpers, 'readIfExists');

		getComponentNameMock.returns(new Promise((resolve) => {
			resolve(mockName);
		}));

		readIfExistsMock.returns(new Promise((resolve) => {
			resolve(mockScss);
		}));
	});

	afterEach(() => {
		fileHelpers.getComponentName.restore();
		fileHelpers.readIfExists.restore();
	});

	it('includes component scss with a primary mixin include', () => {
		return getBaseKarmaConfig().then(actualConfig => {
			const actualScssConfig = actualConfig.scssPreprocessor.options.data;
			proclaim.equal(
				actualScssConfig,
				`$system-code: "origami-build-tools";$o-brand: core;${mockScss}@if mixin-exists('${mockPrimaryMixinName}') {@include ${mockPrimaryMixinName}();};`
			);
		});
	});

	it('includes only npm scss paths', () => {
		return getBaseKarmaConfig().then(actualConfig => {
			const actual = actualConfig.scssPreprocessor.options.includePaths;
			const expected = [
				process.cwd(),
				path.resolve(process.cwd(), '..', '..', `node_modules`),
				path.resolve(process.cwd(), `node_modules`),
				path.resolve(process.cwd(), 'node_modules/@financial-times')
			];
			proclaim.deepEqual(actual, expected);
		});
	});
});
