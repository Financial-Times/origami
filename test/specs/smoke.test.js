/* eslint-env mocha */
/* global proclaim sinon */

import * as o from '../helpers/events.js';
import Overlay from '../../src/js/overlay.js';

const testContent = '<div class="test-overlay"><span class="test-overlay__text">Hello Overlay</span></div>';

describe("smoke-tests (./overlay.js)", function() {

	afterEach(() => {
		Overlay.destroy();
		const overlays = document.querySelectorAll('.o-overlay, .o-overlay-shadow');
		for (let i = 0; i < overlays.length; i++) {
			overlays[i].parentNode.removeChild(overlays[i]);
		}
	});

	describe('opening and closing', () => {

		beforeEach(() => {
			const el = document.createElement('button');
			el.setAttribute('data-o-overlay-src', '.test-overlay');
			el.setAttribute('data-o-overlay-id', 'testOverlay');
			el.setAttribute('data-o-overlay-heading-title', 'test title');
			el.className = 'o-overlay-trigger';
			document.body.appendChild(el);

			const container = document.createElement('div');
			container.className = 'js-container';
			document.body.appendChild(container);

			document.body.innerHTML += testContent;
		});

		afterEach(() => {
			const testEl = document.querySelector('.test-overlay');
			testEl.parentNode.removeChild(testEl);
			const triggerEl = document.querySelector('.o-overlay-trigger');
			triggerEl.parentNode.removeChild(triggerEl);
			const containerEl = document.querySelector('.js-container');
			containerEl.parentNode.removeChild(containerEl);
		});

		it('should open with correct content when trigger is clicked', done => {
			const trigger = document.querySelector('.o-overlay-trigger');
			o.fireEvent(trigger, 'click');
			const overlays = document.querySelectorAll('.o-overlay');
			proclaim.equal(overlays.length, 0);

			Overlay.init();

			function overlayReadyHandler() {
				const wrapper = document.querySelectorAll('.o-overlay');
				const content = wrapper[0].querySelectorAll('.o-overlay__content');
				const heading = wrapper[0].querySelectorAll('.o-overlay__heading');
				const shadow = document.querySelectorAll('.o-overlay-shadow');
				const close = heading[0].querySelectorAll('.o-overlay__close');
				const testBody = content[0].querySelectorAll('.test-overlay');

				proclaim.equal(wrapper.length, 1);
				proclaim.equal(content.length, 1);
				proclaim.equal(shadow.length, 1);
				proclaim.equal(heading.length, 1);
				proclaim.equal(close.length, 1);
				proclaim.equal(testBody.length, 1);

				Overlay.getOverlays()['testOverlay'].close();
				document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);

				done();
			}

			document.body.addEventListener('oOverlay.ready', overlayReadyHandler);

			o.fireEvent(trigger, 'click');
		});

		it('modal should be closable with esc key, close button and with new layer', done => {
			const realCloseFunction = Overlay.prototype.close;
			const stubbedCloseFunction = sinon.stub();
			Overlay.prototype.close = stubbedCloseFunction;

			const trigger = document.querySelector('.o-overlay-trigger');
			const overlays = Overlay.init();
			const currentOverlay = overlays[0];

			function overlayReadyHandler() {
				o.fireEvent(document.querySelector('.o-overlay__close'), 'click');
				o.fireEvent(document.body, 'click');
				o.fireEvent(document.body, 'keyup', {
					keyCode: 27
				});
				o.fireCustomEvent(document.body, 'oLayers.new');
				proclaim.equal(Overlay.prototype.close.callCount, 3);

				Overlay.prototype.close = realCloseFunction;
				currentOverlay.close();

				document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);
				done();
			}

			document.body.addEventListener('oOverlay.ready', overlayReadyHandler);
			o.fireEvent(trigger, 'click');

		});

		it('modal with prevent closing should not be closable with esc key, close button, but can with new layer ', done => {

			const realCloseFunction = Overlay.prototype.close;
			const stubbedCloseFunction = sinon.stub();
			Overlay.prototype.close = stubbedCloseFunction;

			const trigger = document.querySelector('.o-overlay-trigger');
			trigger.setAttribute('data-o-overlay-preventclosing', true);

			const overlays = Overlay.init();
			const currentOverlay = overlays[0];

			function overlayReadyHandler() {
				const overlayClose = document.querySelector('.o-overlay__close');
				if (overlayClose) {
					o.fireEvent(document.querySelector('.o-overlay__close'), 'click');
				}
				o.fireEvent(document.body, 'click');
				o.fireEvent(document.body, 'keyup', {
					keyCode: 27
				});

				proclaim.equal(Overlay.prototype.close.callCount, 0);

				o.fireCustomEvent(document.body, 'oLayers.new');

				proclaim.equal(Overlay.prototype.close.callCount, 1);

				Overlay.prototype.close = realCloseFunction;
				currentOverlay.close();

				document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);
				done();
			}

			document.body.addEventListener('oOverlay.ready', overlayReadyHandler);
			o.fireEvent(trigger, 'click');

		});


		it('non-modal should be closable in different ways', function() {
			const realCloseFunction = Overlay.prototype.close;
			const stubbedCloseFunction = sinon.stub();
			Overlay.prototype.close = stubbedCloseFunction;

			const trigger = document.querySelector('.o-overlay-trigger');
			trigger.setAttribute('data-o-overlay-modal', 'false');

			const overlays = Overlay.init();
			const currentOverlay = overlays[0];

			o.fireEvent(trigger, 'click');
			o.fireEvent(document.querySelector('.o-overlay__close'), 'click');
			o.fireEvent(document.body, 'click');
			o.fireEvent(document.body, 'keyup', {
				keyCode: 27
			});
			o.fireCustomEvent(document.body, 'oLayers.new', {el: 'something'});

			proclaim.equal(Overlay.prototype.close.callCount, 4);

			Overlay.prototype.close = realCloseFunction;
			currentOverlay.close();
		});

		it('should be closable in fewer ways when nested in the page', function() {
			const realCloseFunction = Overlay.prototype.close;
			const stubbedCloseFunction = sinon.stub();
			Overlay.prototype.close = stubbedCloseFunction;

			const trigger = document.querySelector('.o-overlay-trigger');
			trigger.setAttribute('data-o-overlay-modal', 'false');
			trigger.setAttribute('data-o-overlay-parentnode', '.js-container');
			trigger.setAttribute('data-o-overlay-nested', 'true');

			const overlays = Overlay.init();
			const currentOverlay = overlays[0];

			o.fireEvent(trigger, 'click');

			o.fireEvent(document.body, 'keyup', {
				keyCode: 27
			});
			proclaim.equal(Overlay.prototype.close.callCount, 0);

			o.fireCustomEvent(document.body, 'oLayers.new', {el: 'something'});
			proclaim.equal(Overlay.prototype.close.callCount, 1);

			o.fireEvent(document.querySelector('.o-overlay__close'), 'click');
			proclaim.equal(Overlay.prototype.close.callCount, 2);

			Overlay.prototype.close = realCloseFunction;
			currentOverlay.close();
		});

		it('should act as a layer by default', () => {
			let newLayers = 0;
			let closedLayers = 0;
			document.body.addEventListener('oLayers.new', () => {
				newLayers++;
			});
			document.body.addEventListener('oLayers.close', () => {
				closedLayers++;
			});

			const realCloseFunction = Overlay.prototype.close;
			const stubbedCloseFunction = sinon.stub();
			Overlay.prototype.close = stubbedCloseFunction;

			const trigger = document.querySelector('.o-overlay-trigger');
			const overlays = Overlay.init();
			const currentOverlay = overlays[0];

			o.fireEvent(trigger, 'click');

			proclaim.equal(newLayers, 1);
			proclaim.equal(closedLayers, 0);

			o.fireCustomEvent(document.body, 'oLayers.new', {el: 'something'});
			proclaim.equal(Overlay.prototype.close.callCount, 1);

			Overlay.prototype.close = realCloseFunction;
			currentOverlay.close();

			proclaim.equal(newLayers, 2);
			proclaim.equal(closedLayers, 1);
		});

		it('should support having layer functionality disabled', () => {
			let newLayers = 0;
			let closedLayers = 0;
			document.body.addEventListener('oLayers.new', () => {
				newLayers++;
			});
			document.body.addEventListener('oLayers.close', () => {
				closedLayers++;
			});

			const realCloseFunction = Overlay.prototype.close;
			const stubbedCloseFunction = sinon.stub();
			Overlay.prototype.close = stubbedCloseFunction;

			const trigger = document.querySelector('.o-overlay-trigger');
			trigger.setAttribute('data-o-overlay-layer', 'false');
			const overlays = Overlay.init();
			const currentOverlay = overlays[0];

			o.fireEvent(trigger, 'click');

			proclaim.equal(newLayers, 0);
			proclaim.equal(closedLayers, 0);

			o.fireCustomEvent(document.body, 'oLayers.new', {el: 'something'});
			proclaim.equal(Overlay.prototype.close.callCount, 0);

			Overlay.prototype.close = realCloseFunction;
			currentOverlay.close();

			proclaim.equal(newLayers, 1);
			proclaim.equal(closedLayers, 0);
		});

		it('should remove all traces on close', function() {
			const trigger = document.querySelector('.o-overlay-trigger');
			trigger.setAttribute('data-o-overlay-modal', 'false');
			Overlay.init();

			o.fireEvent(trigger, 'click');

			o.fireEvent(document.querySelector('.o-overlay__close'), 'click');

			proclaim.equal(document.querySelectorAll('.o-overlay').length, 0);

			Overlay.destroy();

			o.fireEvent(trigger, 'click');
			proclaim.equal(document.querySelectorAll('.o-overlay').length, 0);

			sinon.spy(Overlay.prototype, 'close');
			sinon.spy(Overlay.prototype, 'realign');
			sinon.spy(Overlay.prototype, 'resizeListener');
			sinon.spy(Overlay.prototype, 'closeOnExternalClick');
			sinon.spy(Overlay.prototype, 'closeOnEscapePress');

			o.fireCustomEvent(document.body, 'oViewport.resize');
			o.fireCustomEvent(document.body, 'oLayers.new');
			o.fireEvent(document.body, 'click');
			o.fireEvent(document.body, 'keyup');

			proclaim.equal(Overlay.prototype.close.callCount, 0);
			proclaim.equal(Overlay.prototype.realign.callCount, 0);
			proclaim.equal(Overlay.prototype.resizeListener.callCount, 0);
			proclaim.equal(Overlay.prototype.closeOnExternalClick.callCount, 0);
			proclaim.equal(Overlay.prototype.closeOnEscapePress.callCount, 0);

			// Restore functions
			Overlay.prototype.close.restore();
			Overlay.prototype.realign.restore();
			Overlay.prototype.resizeListener.restore();
			Overlay.prototype.closeOnExternalClick.restore();
			Overlay.prototype.closeOnEscapePress.restore();
		});

		it('should be possible to open and close imperatively', function() {
			const mod = new Overlay('testOverlay', {
				html: testContent,
				trigger: document.querySelector('.o-overlay-trigger')
			});

			mod.open();

			let overlays = document.querySelectorAll('.o-overlay');
			proclaim.equal(overlays.length, 1);
			mod.close();
			overlays = document.querySelectorAll('.o-overlay');
			proclaim.equal(overlays.length, 0);
		});

		it('should open and close with correct aria attributes', done => {
			const trigger = document.querySelector('.o-overlay-trigger');
			o.fireEvent(trigger, 'click');

			Overlay.init();

			function overlayReadyHandler() {
				const wrapper = document.querySelectorAll('.o-overlay');
				const wrapperRole = wrapper[0].getAttribute('role');
				proclaim.equal(wrapperRole, 'dialog');

				const wrapperLabel = wrapper[0].getAttribute('aria-labelledby');
				proclaim.ok(wrapperLabel);
				proclaim.notEqual(wrapperLabel, ' ');

				let triggerPressed = trigger.getAttribute('aria-pressed');
				proclaim.equal(triggerPressed, 'true');

				Overlay.getOverlays()['testOverlay'].close();
				document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);

				triggerPressed = trigger.getAttribute('aria-pressed');
				proclaim.equal(triggerPressed, 'false');

				done();
			}

			document.body.addEventListener('oOverlay.ready', overlayReadyHandler);

			o.fireEvent(trigger, 'click');
		});
	});

	it('should be able to inject content from template', () => {
		const scriptEl = document.createElement('script');
		scriptEl.id = 'test-overlay-content';
		scriptEl.setAttribute('type', 'text/template');
		scriptEl.innerHTML = "Test content";
		document.body.appendChild(scriptEl);

		const mod = new Overlay('testOverlay', {
			src: '#test-overlay-content',
			trigger: document.querySelector('.o-overlay-trigger')
		});

		mod.open();

		let overlays = document.querySelectorAll('.o-overlay');
		proclaim.equal(overlays.length, 1);
		mod.close();
		overlays = document.querySelectorAll('.o-overlay');
		proclaim.equal(overlays.length, 0);
		document.body.removeChild(scriptEl);
	});

	// Note: must not be an arrow function as we reference `this`
	it('should be able to inject content from a url', function(done) {
		// Increase the timeout of this function to allow for the fetching of the url
		this.timeout(10000);

		const mod = new Overlay('testOverlay', {
			src: 'https://www.ft.com/__origami/service/build/v2/files/o-card@2.2.3/demos/standard.html',
			trigger: document.querySelector('.o-overlay-trigger')
		});

		function overlayReadyHandler() {
			let overlays = document.querySelectorAll('.o-overlay');
			proclaim.equal(overlays.length, 1);

			proclaim.include(mod.content.innerHTML, '<div class="o-card__container">');

			mod.close();
			overlays = document.querySelectorAll('.o-overlay');
			proclaim.equal(overlays.length, 0);
			mod.context.removeEventListener('oOverlay.ready', overlayReadyHandler);
			done();
		}

		// Setup event listener first
		mod.context.addEventListener('oOverlay.ready', overlayReadyHandler);
		// Open the overlay
		mod.open();
	});

	it('should add the unique id as a CSS styling hook', () => {
		const mod = new Overlay('test overlay', {
			html: testContent
		});
		mod.open();

		const overlays = document.querySelectorAll('.o-overlay--test-overlay');
		proclaim.equal(overlays.length, 1);

		mod.close();
	});
});
