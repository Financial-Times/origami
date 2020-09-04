/* eslint-env mocha */
/* global proclaim sinon */

import construct from '../src/js/construct-element.js';
import fixtures from './helpers/fixtures.js';

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

const flatten = string => string.replace(/\s/g, '');

describe("constructElement", () => {
	let mockObj;
	beforeEach(() => {
		mockObj = {
			opts: {
				type: 'alert',
				state: 'success',
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
				}
			}
		};
	});

	describe('.message (inner + additional info)', () => {
		it('returns an HTML element', () => {
			proclaim.instanceOf(construct.message(mockObj.opts), HTMLElement);
		});

		it('builds a message component based on the provided theme', () => {
			proclaim.strictEqual(flatten(construct.message(mockObj.opts).innerHTML), flatten(fixtures.alert));
		});

		it('throws an error if no type is defined', () => {
			mockObj.opts.type = null;

			const error = "*** o-message error:\nMessages require a type. Available types are:\n- action\n- alert\n- notice\n***";
			proclaim.throws(() => construct.message(mockObj.opts), error);
		});

		it('throws an error if no state is defined', () => {
			mockObj.opts.state = null;

			const error = "*** o-message error:\nMessages require a state.\n***";
			proclaim.throws(() => construct.message(mockObj.opts), error);
		});

		describe('builds an inner version of component if an inner option is true', () => {
			beforeEach(() => {
				mockObj.opts.inner = true;
			});

			it('if additional info is provided', () => {
				mockObj.opts.content.additionalInfo = 'Additional info';
				proclaim.strictEqual(flatten(construct.message(mockObj.opts).innerHTML), flatten(fixtures.innerAlert));
			});

			it('if additional info is not provided', () => {
				mockObj.opts.content.additionalInfo = false;
				proclaim.strictEqual(flatten(construct.message(mockObj.opts).innerHTML), flatten(fixtures.innerAlertWithOutAdditionalInfo));
			});
		});
	});

	describe('.message (notice)', () => {
		beforeEach(() => {
			mockObj = {
				opts: {
					type: 'notice',
					state: 'inform',
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
					}
				}
			};
		});

		it('returns an HTML element', () => {
			proclaim.instanceOf(construct.message(mockObj.opts), HTMLElement);
		});

		it('builds a message component based on the provided messageClass and theme', () => {
			proclaim.strictEqual(flatten(construct.message(mockObj.opts).innerHTML), flatten(fixtures.notice));
		});

		it('throws an error if no state is defined', () => {
			mockObj.opts.state = null;

			const error = "*** o-message error:\nMessages require a state.\n***";
			proclaim.throws(() => construct.message(mockObj.opts), error);
		});
	});

	describe('.closeButton', () => {
		it('returns an HTML element', () => {
			proclaim.instanceOf(construct.closeButton(), HTMLElement);
		});

		it('builds a close button component', () => {
			proclaim.strictEqual(flatten(construct.closeButton().outerHTML), flatten(fixtures.closeButton));
		});
	});
});
