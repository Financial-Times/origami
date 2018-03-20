/* eslint-env mocha, sinon, proclaim */

import construct from '../src/js/construct-element';
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

	describe('.alertMessage', () => {
		it('returns an HTML element', () => {
			assert.instanceOf(construct.alertMessage(options), HTMLElement);
		});

		it('builds a message component based on the provided messageClass and theme', () => {
			assert.strictEqual(flatten(construct.alertMessage(options).innerHTML), flatten(fixtures.alert));
		});

		it('throws an error if no status is defined', () => {
			options.status = null;

			let error = "*** o-message error: Alert messages require a status. The options are 'success', 'error', or 'neutral' ***";
			assert.throws(() => construct.alertMessage(options), error);
		});

		describe('builds an inline version of component if an inline option is true', () => {
			beforeEach(() => {
				options.type = 'alert-inner';
			});

			it('if additional info is provided', () => {
				options.content.additionalInfo = 'Additional info';
				assert.strictEqual(flatten(construct.alertMessage(options).innerHTML), flatten(fixtures.innerAlert));
			});

			it('if additional info is not provided', () => {
				options.content.additionalInfo = false;
				assert.strictEqual(flatten(construct.alertMessage(options).innerHTML), flatten(fixtures.innerAlertWithOutAdditionalInfo));
			});
		});
	});

	describe('.noticeMessage', () => {
		beforeEach(() => {
			options = {
				messageClass: 'my-message',
				type: 'notice',
				status: 'inform',
				content: {
					detail: 'Many things are here to be said about this message'
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

		it('returns an HTML element', () => {
			assert.instanceOf(construct.noticeMessage(options), HTMLElement);
		});

		it('builds a message component based on the provided messageClass and theme', () => {
			assert.strictEqual(flatten(construct.noticeMessage(options).innerHTML), flatten(fixtures.notice));
		});

		it('throws an error if no status is defined', () => {
			options.status = null;

			let error = "*** o-message error: Notice messages require a status. The options are 'inform', 'warning' or 'warning-light' ***";
			assert.throws(() => construct.noticeMessage(options), error);
		});
	});

	describe('.closeButton', () => {
		it('returns an HTML element', () => {
			assert.instanceOf(construct.closeButton(options), HTMLElement);
		});

		it('builds a close button component', () => {
			assert.strictEqual(flatten(construct.closeButton(options).outerHTML), flatten(fixtures.closeButton));
		});
	});
});
