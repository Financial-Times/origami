'use strict';
/* eslint-env mocha */

const mockery = require('mockery');
const proclaim = require('proclaim');
const sinon = require('sinon');
const process = require('process');

const path = require('path');

const obtPath = process.cwd();
const oTestPath = 'test/unit/fixtures/verify';
const verifyTestPath = path.resolve(obtPath, oTestPath);

describe('verify-sass', function () {
	const stylelintExecaErrorFixture = Object.assign(new Error(), {
		shortMessage: 'Command failed with exit code 2: ./node_modules/.bin/stylelint **/*.scss --ignore-path=".gitignore" --config=".stylelintrc.cjs" --formatter="json"',
		command: './node_modules/.bin/stylelint **/*.scss --ignore-path=".gitignore" --config=".stylelintrc.cjs" --formatter="json"',
		exitCode: 2,
		signal: undefined,
		signalDescription: undefined,
		stdout: `[{"source":"/o-table/main.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":true,"warnings":[{"line":48,"column":2,"rule":"indentation","severity":"error","text":"Expected indentation of 1 tab (indentation)"}]},{"source":"/o-table/demos/src/demo.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_base.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_borders.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_brand.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_compact.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_container.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_lines.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_responsive-flat.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_responsive-overflow.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_responsive-scroll.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_row-headings.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_row-stripes.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_sort.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_variables.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/o-table/src/scss/_wrapper.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]}]`,
		stderr: '',
		failed: true,
		timedOut: false,
		isCanceled: false,
		killed: false
	});

	const stylelintExecaPassFixture = new Promise(resolve => resolve({
		command: './node_modules/.bin/stylelint **/*.scss --ignore-path=".gitignore" --config=".stylelintrc.cjs" --formatter="json"',
		exitCode: 0,
		stdout: `[{"source":"/main.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/demos/src/demo.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_base.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_borders.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_brand.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_compact.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_container.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_lines.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_responsive-flat.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_responsive-overflow.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_responsive-scroll.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_row-headings.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_row-stripes.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_sort.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_variables.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]},{"source":"/src/scss/_wrapper.scss","deprecations":[{"text":"'at-rule-blacklist' has been deprecated. Instead use 'at-rule-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/at-rule-blacklist/README.md"},{"text":"'declaration-property-value-blacklist' has been deprecated. Instead use 'declaration-property-value-disallowed-list'.","reference":"https://github.com/stylelint/stylelint/blob/13.7.0/lib/rules/declaration-property-value-blacklist/README.md"}],"invalidOptionWarnings":[],"parseErrors":[],"errored":false,"warnings":[]}]`,
		stderr: '',
		all: undefined,
		failed: false,
		timedOut: false,
		isCanceled: false,
		killed: false
	}));

	beforeEach(function() {
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});
		mockery.registerMock('is-ci', true);
		process.env.CI = true;
		const execaPassMock = sinon.stub().returns(stylelintExecaPassFixture);
		mockery.registerMock('execa', execaPassMock);
		process.chdir(verifyTestPath);
	});

	afterEach(function () {
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
		process.chdir(obtPath);
	});

	describe('default title', () => {
		const verify = require('../../../lib/tasks/verify-sass');

		it('should be "Linting Sass"', () => {
			proclaim.equal(verify().title, 'Linting Sass');
		});
	});

	describe('skip', () => {
		const verify = require('../../../lib/tasks/verify-sass');

		it('should return true if the file does not exist', () => {
			// there is no scss to test in the js folder
			process.chdir(path.resolve(verifyTestPath, 'src/js'));
			return verify().skip().then(skip => {
				proclaim.ok(skip);
			});
		});

		it('should return a helpful message if the file does not exist', () => {
			// there is no scss to test in the js folder
			process.chdir(path.resolve(verifyTestPath, 'src/js'));
			return verify().skip().then(skip => {
				proclaim.equal(skip, 'No Sass files found.');
			});
		});

		it('should return a falsey value if the file does exist', () => {
			return verify().skip().then(skip => {
				proclaim.notOk(skip);
			});
		});
	});

	describe('task', () => {
		describe('with passing Sass', () => {
			it('should not error given', async function () {
				const verify = require('../../../lib/tasks/verify-sass');
				await verify().task();
			});
		});

		describe('with Sass linting issue', () => {
			let verify;

			beforeEach(function () {
				const execaErrorMock = sinon.stub().rejects(stylelintExecaErrorFixture);
				mockery.registerMock('execa', execaErrorMock);
				verify = require('../../../lib/tasks/verify-sass');
			});

			it('errors, formatted for engineers', async function () {
				await verify().task().then(() => {
					throw new Error('Did not throw an error.');
				}).catch((error) => {
					// Error thrown as expected.
					proclaim.include(error.message, './o-table/main.scss:48:2 error - Expected indentation of 1 tab (indentation)');
				});
			});

			it('logs, formatted for Github', async function () {
				const expectation = sinon.mock(console)
					.expects('log')
					.withArgs(`::error file=/o-table/main.scss,line=48,col=2,code=indentation,severity=error::Expected indentation of 1 tab (indentation)`);
				try {
					await verify().task();
				} catch (error) {
					// expecting an error
				}
				expectation.verify();
			});
		});
	});
});
