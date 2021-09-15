'use strict';

const constructPolyfillUrl = require('../helpers/construct-polyfill-url');
const Listr = require('listr');
const ListrRenderer = require('../helpers/listr-renderer');
const denodeify = require('util').promisify;
const deglob = denodeify(require('deglob'));
const { getBrowserStackKarmaConfig } = require('../../config/karma.config.browserstack.js');
const { getChromeKarmaConfig } = require('../../config/karma.config.chrome.js');

const karmaTest = function (config, task) {
	if (config.browserstack) {
		const {
			BROWSER_STACK_USERNAME,
			BROWSER_STACK_ACCESS_KEY
		} = process.env;

		if (!BROWSER_STACK_USERNAME || !BROWSER_STACK_ACCESS_KEY) {
			return Promise.reject(new Error("Required environment variables (BROWSER_STACK_USERNAME, BROWSER_STACK_ACCESS_KEY) not supplied"));
		}
	}
	const getCustomKarmaConfig = config.browserstack ? getBrowserStackKarmaConfig : getChromeKarmaConfig;
	return Promise.all([constructPolyfillUrl(), getCustomKarmaConfig(config)]).then(values => {
		const polyfillUrl = values[0];

		// Add default Karma config to custom Karma config.
		const customKarmaConfig = values[1];
		const cfg = require('karma').config;
		Object.assign(customKarmaConfig, { basePath: config.cwd });
		const karmaConfig = cfg.parseConfig(null, customKarmaConfig);

		return new Promise((resolve, reject) => {
			const debug = Boolean(config.debug);

			if (debug) {
				karmaConfig.singleRun = false;
				karmaConfig.autoWatch = true;
				karmaConfig.restartOnFileChange = true;
			}

			const { reporter, errors } = require('../plugins/listr-karma')();

			karmaConfig.files.unshift(
				{
					pattern: polyfillUrl,
					included: true,
					served: true,
					watched: false
				});
			karmaConfig.plugins.unshift(reporter);
			karmaConfig.reporters = ['listr'];

			const Server = require('karma').Server;
			const server = new Server(karmaConfig, exitCode => {
				if (exitCode !== 0) {
					task.title += `Failed Karma tests: ${'\n\n    ' + errors.join('\n    ')}`;
					reject(new Error(`Failed Karma tests`));
				} else {
					resolve();
				}
			});

			server.on('browser_start', function (browser) {
				task.title = `Starting tests on ${browser.name}`;
			});

			server.on('browser_register', function (browser) {
				task.title = `Running tests on ${browser.name}`;
			});

			server.on('browser_complete', function (browser) {
				const results = browser.lastResult;
				task.title = `Completed tests on ${browser.name} in ${results.totalTime / 1000} seconds. Ran ${results.total} tests. ${results.success} tests successful. ${results.failed} tests failed. `;
			});

			server.on('browser_error', function (browser, error) {
				task.title = `Error with ${browser.name}`;
				reject(new Error(`Error connecting to ${browser.name}: ${error.toString()}`));
			});

			server.on('browser_register', function (browser) {
				if (debug) {
					task.title = 'Running tests, visit http://localhost:9876/ to debug';
				} else {
					task.title = `Opening ${browser.name}`;
				}
			});

			server.start(karmaConfig);

			task.title = 'Starting Karma server';
		});
	});
};

module.exports = (cfg) => {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	return {
		title: 'Running Karma tests',
		task: (context, task) => {

			if (config.browserstack) {
				task.title = 'Running Karma tests on BrowserStack';
			} else {
				task.title = 'Running Karma tests on Chrome Stable';
			}

			return new Listr([
				{
					title: 'Tests starting...',
					task: (context, task) => karmaTest(config, task)
				}
			], {
				renderer: ListrRenderer,
				collapse: false,
				showSubtasks: true,
				concurrent: true
			});
		},
		skip: () => {
			if (config.testFilter && config.testFilter !== 'karma') {
				return 'Karma tests filtered out with --test-filter';
			}
			const opts = {
				useGitIgnore: true,
				usePackageJson: false,
				cwd: config.cwd,
				ignore: ['test/scss/test-runner.js']
			};

			return deglob(['test/**/*.js', 'test/*.js'], opts)
				.then(function (files) {
					if (files.length === 0) {
						return 'No test files found, consider adding some tests to make sure the code is working as expected.';
					} else {
						return false;
					}
				})
				.catch(() => false);
		}
	};
};
