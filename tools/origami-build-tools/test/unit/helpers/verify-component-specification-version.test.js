/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');
const mockery = require('mockery');

describe('verify-component-specification-version', function () {

	let verifyComponentSpecificationVersion;
	let origamiManifest;

	beforeEach(function () {
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});
		mockery.registerMock('./files', {
			getOrigamiJson: () => new Promise(resolve => resolve(origamiManifest))
		});
		verifyComponentSpecificationVersion = require('../../../lib/helpers/verify-component-specification-version');
	});

	it('returns undefined for a component which follows version "2.0" of the spec', async function () {
		origamiManifest = {
			origamiVersion: "2.0"
		};
		const result = await verifyComponentSpecificationVersion();
		proclaim.isUndefined(result);
	});

	it('returns undefined for a component which follows version "2.1" of the spec', async function () {
		origamiManifest = {
			origamiVersion: "2.0"
		};
		const result = await verifyComponentSpecificationVersion();
		proclaim.isUndefined(result);
	});

	it('returns undefined for a component which follows some future version of the spec', async function () {
		origamiManifest = {
			origamiVersion: "13.7"
		};
		const result = await verifyComponentSpecificationVersion();
		proclaim.isUndefined(result);
	});

	it('throws an error for a component which follows version "2" of the spec but is misconfigured with a number instead of a string', async function () {
		origamiManifest = {
			origamiVersion: 2.0
		};
		try {
			await verifyComponentSpecificationVersion();
		} catch (error) {
			return proclaim.ok(true);
		}
		proclaim.ok(false, 'No error was thrown');
	});

	it('throws an error for a component which follows version "1" of the spec', async function () {
		origamiManifest = {
			origamiVersion: 1
		};
		try {
			await verifyComponentSpecificationVersion();
		} catch (error) {
			return proclaim.ok(true);
		}
		proclaim.ok(false, 'No error was thrown');
	});

	it('throws an error for a project which does not have an origami manifest file', async function () {
		origamiManifest = null;
		try {
			await verifyComponentSpecificationVersion();
		} catch (error) {
			return proclaim.ok(true);
		}
		proclaim.ok(false, 'No error was thrown');
	});
});
