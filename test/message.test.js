/* eslint-env mocha */
/* global proclaim sinon */

import Message from '../src/js/message';
import construct from '../src/js/construct-element';
import fixtures from './helpers/fixtures';

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe("Message", () => {
	let testArea;
	let message;
	let messageElement;
	const stubs = {};
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

			messageElement = document.querySelector('[data-o-component=o-message]');
			message = new Message(messageElement);


			Message.prototype.render.restore();
			Message.prototype.open.restore();
			Message.prototype.close.restore();
			Message.getDataAttributes.restore();
		});

		it('stores `messageElement` in a `messageElement` property', () => {
			proclaim.strictEqual(message.messageElement, messageElement);
		});

		it('has default options, and stores them in an `opts` property', () => {
			proclaim.isObject(message.opts);
			proclaim.notStrictEqual(message.opts, {});
			proclaim.deepEqual(message.opts, {
				autoOpen: true,
				type: null,
				state: null,
				inner: false,
				parentElement: null,
				content: {
					highlight: null,
					detail: '&hellip;',
					additionalInfo: false
				},
				actions: {
					primary: {
						text: null,
						url: null,
						openInNewWindow: false
					},
					secondary: {
						text: null,
						url: null,
						openInNewWindow: false
					}
				},
				close: true
			});
		});

		it('extracts options from the DOM', () => {
			proclaim.calledOnce(stubs.getDataAttributes);
		});

		it('opens the message by default', () => {
			proclaim.calledOnce(stubs.open);
		});

		it('does not close the message', () => {
			proclaim.notCalled(stubs.close);
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
				proclaim.notCalled(stubs.open);
			});

			it('closes the message', () => {
				proclaim.calledOnce(stubs.close);
			});

			it('does not extract options from the DOM', () => {
				proclaim.notCalled(stubs.getDataAttributes);
			});

		});

		describe('.render()', () => {
			let mockMessageElement;
			let mockParentElement;
			let mockCloseButton;

			beforeEach(() => {
				options = {
					state: 'success',
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
				sinon.stub(construct, 'message').returns(mockMessageElement);
				sinon.stub(construct, 'closeButton').returns(mockCloseButton);

				Message.prototype.open.restore();
				Message.prototype.close.restore();
			});

			afterEach(() => {
				construct.message.restore();
				construct.closeButton.restore();
			});

			it('calls `construct.message` if messageEl is not an HTML element', () => {
				message = new Message(null, options);
				proclaim.calledOnce(construct.message);
			});

			it('calls `construct.message` if opts.parentElement is present', () => {
				mockParentElement = document.createElement('div');
				mockParentElement.classList.add('some-class');
				document.body.appendChild(mockParentElement);

				options.parentElement = '.some-class';
				message = new Message(null, options);
				proclaim.calledOnce(construct.message);
			});

			it('calls `construct.closeButton` if opts.close is true', () => {
				message = new Message(null, options);
				proclaim.calledOnce(construct.closeButton);
			});

			it('does not call `construct.closeButton` if opts.close is false', () => {
				options.close = false;
				message = new Message(null, options);
				proclaim.notCalled(construct.closeButton);
			});

			it('does not call `construct.closeButton` if there is already one', () => {
				messageElement = document.createElement('div');
				messageElement.innerHTML = `<a href='#' class='o-message__close'></a>`;
				message = new Message(messageElement, options);
				proclaim.notCalled(construct.closeButton);
			});
		});



		describe('.getDataAttributes', () => {
			let mockMessageEl;
			let returnValue;

			beforeEach(() => {
				mockMessageEl = document.createElement('div');
				mockMessageEl.setAttribute('data-o-component', 'o-message');
				mockMessageEl.setAttribute('data-key', 'value');
				mockMessageEl.setAttribute('data-another-key', 'value');
				mockMessageEl.setAttribute('data-o-message-foo', 'bar');
				mockMessageEl.setAttribute('data-o-message-json', '{"foo": "bar"}');
				mockMessageEl.setAttribute('data-o-message-json-single', '{\'foo\': \'bar\'}');
				returnValue = Message.getDataAttributes(mockMessageEl);
			});

			it('returns an object', () => {
				proclaim.isObject(returnValue);
			});

			it('extracts values from data attributes and returns them as object keys', () => {
				proclaim.strictEqual(returnValue.key, 'value');
			});

			it('converts the keys to camel-case', () => {
				proclaim.isUndefined(returnValue['another-key']);
				proclaim.strictEqual(returnValue.anotherKey, 'value');
			});

			it('ignores the `data-o-component` attribute', () => {
				proclaim.isUndefined(returnValue.oComponent);
			});

			it('strips "o-banner" from the key', () => {
				proclaim.isUndefined(returnValue.oMessageFoo);
				proclaim.strictEqual(returnValue.foo, 'bar');
			});

			it('parses the key as JSON if it\'s valid', () => {
				proclaim.isObject(returnValue.json);
				proclaim.deepEqual(returnValue.json, {
					foo: 'bar'
				});
			});

			it('parses the key as JSON even if single quotes are used', () => {
				proclaim.isObject(returnValue.jsonSingle);
				proclaim.deepEqual(returnValue.jsonSingle, {
					foo: 'bar'
				});
			});

			describe('when `messageElement` is not an HTML element', () => {
				let returnValue;

				beforeEach(() => {
					returnValue = Message.getDataAttributes(null);
				});

				it('returns an empty object', () => {
					proclaim.isObject(returnValue);
					proclaim.deepEqual(returnValue, {});
				});
			});
		});
	});
});
