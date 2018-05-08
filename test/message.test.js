/* eslint-env mocha, sinon, proclaim */

import Message from '../src/js/message';
import construct from '../src/js/construct-element';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe("Message", () => {
	let testArea;
	let message;
	let messageElement;
	let stubs = {};
	let options = {};

	before(() => {
		document.body.innerHTML += '<div id="test-area"></div>';
		testArea = document.getElementById('test-area');
	});

	afterEach(() => {
		testArea.innerHTML = '';
	});

	describe('new Message initialised declaratively', () => {
		beforeEach(() => {
			testArea.innerHTML = fixtures.main;
			stubs.render = sinon.stub(Message.prototype, 'render');
			stubs.open = sinon.stub(Message.prototype, 'open');
			stubs.close = sinon.stub(Message.prototype, 'close');
			stubs.getDataAttributes = sinon.stub(Message, 'getDataAttributes');

			options = {};
			messageElement = document.querySelector('[data-o-component=o-message]');
			message = new Message(messageElement);


			Message.prototype.render.restore();
			Message.prototype.open.restore();
			Message.prototype.close.restore();
			Message.getDataAttributes.restore();
		});

		it('stores `messageElement` in a `messageElement` property', () => {
			assert.strictEqual(message.messageElement, messageElement);
		});

		it('has default options, and stores them in an `opts` property', () => {
			assert.isObject(message.opts);
			assert.notStrictEqual(message.opts, options);
			assert.deepEqual(message.opts, {
				autoOpen: true,
				messageClass: 'o-message',
				type: 'alert',
				typeClass: 'o-message--alert',
				typeNucleus: 'alert',
				status: null,
				statusClass: null,
				parentElement: null,
				content: {
					highlight: null,
					detail: '&hellip;',
					additionalInfo: false
				},
				actions: {
					primary: {
						text: null,
						url: '#'
					},
					secondary: {
						text: null,
						url: '#'
					}
				},
				close: true
			});
		});

		it('extracts options from the DOM', () => {
			assert.calledOnce(stubs.getDataAttributes);
		});

		it('opens the message by default', () => {
			assert.calledOnce(stubs.open);
		});

		it('does not close the message', () => {
			assert.notCalled(stubs.close);
		});

		describe('.render()', () => {
			beforeEach(() => {
				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');
				stubs.constructMessageElement = sinon.stub(Message.prototype, 'constructMessageElement');

				Message.prototype.open.restore();
				Message.prototype.close.restore();
				Message.prototype.constructMessageElement.restore();
			});

			it('does not call `constructMessageElement` if messageEl is an HTML element', () => {
				assert.notCalled(stubs.constructMessageElement);
			});
		});
	});

	describe('new Message initialised imperatively', () => {
		describe('when `opts.autoOpen` is false', () => {
			beforeEach(() => {
				stubs.render = sinon.stub(Message.prototype, 'render');
				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');
				stubs.getDataAttributes = sinon.stub(Message, 'getDataAttributes');

				options.autoOpen = false;
				message = new Message(testArea, options);


				Message.prototype.render.restore();
				Message.prototype.open.restore();
				Message.prototype.close.restore();
				Message.getDataAttributes.restore();
			});

			it('does not open the message', () => {
				assert.notCalled(stubs.open);
			});

			it('closes the message', () => {
				assert.calledOnce(stubs.close);
			});

			it('does not extract options from the DOM', () => {
				assert.notCalled(stubs.getDataAttributes);
			});

		});

		describe('accepts a different base class string', () => {
			beforeEach(() => {
				stubs.render = sinon.stub(Message.prototype, 'render');
				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');

				options.messageClass = 'my-message';
				message = new Message(testArea, options);

				Message.prototype.render.restore();
				Message.prototype.open.restore();
				Message.prototype.close.restore();
			});

			it('to apply to the element', () => {
				assert.strictEqual(message.opts.messageClass, 'my-message');
			});

			it('to apply to the type class', () => {
				assert.strictEqual(message.opts.typeClass, 'my-message--alert');
			});
		});

		describe('.render()', () => {
			let mockMessageElement;

			beforeEach(() => {
				const mockContainerElement = document.createElement('div');
				mockMessageElement = document.createElement('div');
				mockMessageElement.appendChild(mockContainerElement);

				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');
				stubs.constructMessageElement = sinon.stub(Message.prototype, 'constructMessageElement').returns(mockMessageElement);

				message = new Message(null);

				Message.prototype.open.restore();
				Message.prototype.close.restore();
				Message.prototype.constructMessageElement.restore();
			});

			it('calls `constructMessageElement` if messageEl is not an HTML element', () => {
				assert.calledOnce(stubs.constructMessageElement);
			});

			it('calls `constructMessageElement` if opts.parentElement is present', () => {
				options.parentElement = '.some-class';
				assert.calledOnce(stubs.constructMessageElement);
			});
		});

		describe('.constructMessageElement()', () => {
			let mockMessageElement;
			let mockCloseButton;

			beforeEach(() => {
				options = {
					status: 'success',
					type: 'alert',
					content: {
						highlight: 'Good.'
					}
				};

				const mockContainerElement = document.createElement('div');
				mockMessageElement = document.createElement('div');
				mockMessageElement.appendChild(mockContainerElement);
				mockCloseButton = document.createElement('a');

				stubs.open = sinon.stub(Message.prototype, 'open');
				stubs.close = sinon.stub(Message.prototype, 'close');
				sinon.stub(construct, 'alertMessage').returns(mockMessageElement);
				sinon.stub(construct, 'closeButton').returns(mockCloseButton);

				Message.prototype.open.restore();
				Message.prototype.close.restore();
			});

			afterEach(() => {
				construct.alertMessage.restore();
				construct.closeButton.restore();
			});

			it('calls `construct.alertMessage`', () => {
				message = new Message(null, options);
				assert.calledOnce(construct.alertMessage);
			});

			it('throws an error if an incorrect message type is supplied', () => {
				options.type = 'marketing';
				const error = "*** o-message error:\n'marketing' is not a supported message type. The available options are:\n- alert\n- alert-bleed\n- alert-inner\n- notice\n- notice-bleed\n- notice-inner\n***";

				assert.throws(() => { new Message(null, options); }, error);
			});

			it('calls `construct.closeButton` if opts.close is true', () => {
				message = new Message(null, options);
				assert.calledOnce(construct.closeButton);
			});

			it('does not call `construct.closeButton` if opts.close is false', () => {
				options.close = false;
				message = new Message(null, options);
				assert.notCalled(construct.closeButton);
			});

			it('does not call `construct.closeButton` if there is already a', () => {
				messageElement.innerHTML = `<a href='#' class='my-message__close'></a>`;
				message = new Message(messageElement, options);
				assert.notCalled(construct.closeButton);
			});
		});


		describe('.getDataAttributes', () => {
			let mockMessageEl;
			let returnValue;

			beforeEach(() => {
				mockMessageEl = document.createElement('div');
				mockMessageEl.setAttribute('data-o-component', 'o-banner');
				mockMessageEl.setAttribute('data-key', 'value');
				mockMessageEl.setAttribute('data-another-key', 'value');
				mockMessageEl.setAttribute('data-o-message-foo', 'bar');
				mockMessageEl.setAttribute('data-o-message-json', '{"foo": "bar"}');
				mockMessageEl.setAttribute('data-o-message-json-single', '{\'foo\': \'bar\'}');
				returnValue = Message.getDataAttributes(mockMessageEl);
			});

			it('returns an object', () => {
				assert.isObject(returnValue);
			});

			it('extracts values from data attributes and returns them as object keys', () => {
				assert.strictEqual(returnValue.key, 'value');
			});

			it('converts the keys to camel-case', () => {
				assert.isUndefined(returnValue['another-key']);
				assert.strictEqual(returnValue.anotherKey, 'value');
			});

			it('ignores the `data-o-component` attribute', () => {
				assert.isUndefined(returnValue.oComponent);
			});

			it('strips "o-banner" from the key', () => {
				assert.isUndefined(returnValue.oMessageFoo);
				assert.strictEqual(returnValue.foo, 'bar');
			});

			it('parses the key as JSON if it\'s valid', () => {
				assert.isObject(returnValue.json);
				assert.deepEqual(returnValue.json, {
					foo: 'bar'
				});
			});

			it('parses the key as JSON even if single quotes are used', () => {
				assert.isObject(returnValue.jsonSingle);
				assert.deepEqual(returnValue.jsonSingle, {
					foo: 'bar'
				});
			});

			describe('when `messageElement` is not an HTML element', () => {
				let returnValue;

				beforeEach(() => {
					returnValue = Message.getDataAttributes(null);
				});

				it('returns an empty object', () => {
					assert.isObject(returnValue);
					assert.deepEqual(returnValue, {});
				});

			});

		});

	});
});
