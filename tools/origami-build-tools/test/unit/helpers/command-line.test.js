/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');

const commandLine = require('../../../lib/helpers/command-line');

describe('Command line helper', function () {
	it('should return output from stdout', function () {
		return commandLine.run('echo', ['test'], {
			stdout: false,
			stderr: false
		}).then(function (output) {
			proclaim.equal(output.stdout, 'test');
		});
	});

	it('should return output from stderr', function () {
		return commandLine.run('node', ['error'], {
			stdout: false,
			stderr: false
		}).catch(function (output) {
			proclaim.include(output.stderr, 'throw err;');
			proclaim.equal(output.exitCode, 1);
		});
	});
});
