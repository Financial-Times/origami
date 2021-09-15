#!/usr/bin/env node

'use strict';

require('./helpers/update-notifier');
const meow = require('meow');
const aliases = require('aliases');
const http = require('http');
const handler = require('serve-handler');
const chokidar = require('chokidar');
const process = require('process');
const os = require('os');
const path = require('path');
const portfinder = require('portfinder');
const boxen = require('boxen');
const log = require('./helpers/log');
const verifyComponentSpecificationVersion = require('./helpers/verify-component-specification-version');

const rootCheck = require('root-check');
rootCheck(`You are not allowed to run this app with root permissions.
It’s recommended that you configure your system so that npm modules can be globally installed without requiring root.
Please refer to our Troubleshoot guide to learn how to do this: https://github.com/Financial-Times/origami-build-tools/blob/master/TROUBLESHOOT.md`);

const help = `
		Usage
			$ obt <command> [<options>]

		Commands
			develop, dev           Build demos locally every time a file changes and run a server to view them.
			demo, d                Build demos into the demos directory
			init                   Initialise a new component with a boilerplate folder structure
			install, i             Install npm dependencies required to build modules
			test, t                Run Origami specification tests and component specific tests
			verify, v, lint, l     Check folder and code structure follows Origami specification

		Options
			-h, --help                 Print out this message
			--port=<port>              The port to run the local server on if available (default: 8999).
			-v, --version              Print out version of origami-build-tools
			--browserstack             Run tests using Browserstack instead of Chrome Stable. Requires BROWSER_STACK_USERNAME and BROWSER_STACK_ACCESS_KEY to be set.
			--demo-filter=<demo-name>  Build a specific demo. E.G. --demo-filter=pa11y to build only the pa11y.html demo.
			--test-filter=<test-type>  Run a specifc test type. E.G. --test-filter=pa11y to run only the pa11y tests.
			--debug                    Keep the test runner open to enable debugging in any browser.

		Full documentation
			http://git.io/bBjMNw
`;

const cli = meow(help, {
	alias: aliases(help)
});
const interfaces = os.networkInterfaces();

const getNetworkAddress = () => {
	for (const name of Object.keys(interfaces)) {
		for (const int of interfaces[name]) {
			const {address, family, internal} = int;
			if (family === 'IPv4' && !internal) {
				return address;
			}
		}
	}
};

async function startServer(port, previous) {
	const chalk = require('chalk');
	const directoryToServe = cli.flags.cwd || path.join(process.cwd(), '/demos/local');
	server = http.createServer((request, response) => {
		// You pass two more arguments for config and middleware
		// More details here: https://github.com/zeit/serve-handler#options
		return handler(request, response, {
			public: directoryToServe
		});
	  });
	server.listen(await port, () => {
		let message = chalk.green('Serving!');
		const details = server.address();

		let localAddress = null;
		let networkAddress = null;

		if (typeof details === 'string') {
			localAddress = details;
		} else if (typeof details === 'object' && details.port) {
			const address = details.address === '::' ? 'localhost' : details.address;
			const ip = getNetworkAddress();

			localAddress = `http://${address}:${details.port}`;
			networkAddress = `http://${ip}:${details.port}`;
		}

		if (localAddress) {
			const prefix = networkAddress ? '- ' : '';
			const space = networkAddress ? '            ' : '  ';

			message += `\n\n${chalk.bold(`${prefix}Local:`)}${space}${localAddress}`;
		}

		if (networkAddress) {
			message += `\n${chalk.bold('- On Your Network:')}  ${networkAddress}`;
		}

		if (previous) {
			message += chalk.red(`\n\nThis port was picked because ${chalk.underline(previous)} is in use.`);
		}
		console.log(boxen(message, {
			padding: 1,
			borderColor: 'green',
			margin: 1
		}));
	});

	server.on('error', (err) => {
		if (err.code === 'EADDRINUSE') {
			startServer(portfinder.getPortPromise(), port);
			return;
		}

		const error = (message) => chalk`{red ERROR:} ${message}`;
		console.error(error(`Failed to serve: ${err.stack}`));
		process.exit(1);
	});
}

let server;

const argument = cli.input[0];
let task;
switch (argument) {
	case 'init':
		task = require('./tasks/init');
		break;
	case 'demo':
	case 'd':
	case 'develop':
	case 'dev':
		task = require('./tasks/demo');
		break;
	case 'install':
	case 'i':
		task = require('./tasks/install');
		break;
	case 'test':
	case 't':
		task = require('./tasks/test');
		break;
	case 'verify':
	case 'v':
		task = require('./tasks/verify');
		break;
	default:
		cli.showHelp();
		process.exit(2); // eslint-disable-line no-process-exit
		break;
}

(async() => {
	if (task) {
		try {
			await verifyComponentSpecificationVersion();
		} catch (error) {
			log.secondaryError(error.message);
			process.exit(2);
		}
	}
	if (task && (argument === 'develop' || argument === 'dev')) {
		// start a server to show demos
		const port = cli.flags.port || 8999;
		startServer(port);
		// build demos whenever changes are detected
		let childProcess;
		const devArguments = cli.flags.brand ?
			['demo', '--brand', cli.flags.brand] :
			['demo'];
		chokidar.watch(cli.flags.cwd || process.cwd(), {
			ignored: [
				'node_modules',
				'build',
				'.git',
				'demos/local'
			],
			persistent: true,
			followSymlinks: true,
			ignoreInitial: true,
			cwd: cli.flags.cwd || process.cwd()
		})
			.on('all', function () {
				// Clear console
				console.log('\x1Bc');
				if (childProcess) {
					childProcess.kill();
				}

				childProcess = runWatchedTask(devArguments);
			})
			.on('ready', function () {
				childProcess = runWatchedTask(devArguments);
			});
	} else if (task) {
		task(cli)
			.catch(() => {
				if (server) {
					server.stop();
				}
				process.exitCode = 2;
			});
	}
})();

function runWatchedTask(taskWithFlags) {
	log.secondary('Press ctrl+c to exit.');
	const commandLine = require('./helpers/command-line');
	return commandLine.run(__filename, taskWithFlags, {
		cwd: cli.flags.cwd || process.cwd()
	});
}
