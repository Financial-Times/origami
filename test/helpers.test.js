/* eslint-env mocha, sinon, proclaim */

import { buildActions } from '../src/js/helpers';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

const flatten = string => string.replace(/\s/g, '');

describe("constructElement", () => {
	let options;
	beforeEach(() => {
		options = {
			messageClass: 'my-message',
			type: 'alert',
			status: 'success',
			content: {
				highlight: 'Important'
			},
			actions: {
				primary: {
					text: 'a button',
					url: '#'
				},
				secondary: {
					text: 'a link',
					url: '#'
				}
			},
			close: true
		};
	});

	it('builds an actions element', () => {
		assert.strictEqual(flatten(buildActions(options)), flatten(fixtures.actions));
	});
});
