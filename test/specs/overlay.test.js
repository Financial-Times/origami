/* global require, afterEach, beforeEach, describe, it */

const o = require('../helpers/events');
const Overlay = require('../../src/js/overlay');
const testContent = '<div class="test-overlay"><span class="test-overlay__text">Hello Overlay</span></div>';

const expect = require('expect.js');

const sinon = require('sinon/pkg/sinon');

describe("smoke-tests (./overlay.js)", () => {

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

			document.body.innerHTML += testContent;
		});

		afterEach(() => {
			const testEl = document.querySelector('.test-overlay');
			testEl.parentNode.removeChild(testEl);
			const triggerEl = document.querySelector('.o-overlay-trigger');
			triggerEl.parentNode.removeChild(triggerEl);
		});

		it('should open with correct content when trigger is clicked', done => {
			const trigger = document.querySelector('.o-overlay-trigger');
			o.fireEvent(trigger, 'click');
			const overlays = document.querySelectorAll('.o-overlay');
			expect(overlays.length).to.equal(0);

			Overlay.init();

			function overlayReadyHandler() {
				const wrapper = document.querySelectorAll('.o-overlay');
				const content = wrapper[0].querySelectorAll('.o-overlay__content');
				const heading = wrapper[0].querySelectorAll('.o-overlay__heading');
				const shadow = document.querySelectorAll('.o-overlay-shadow');
				const close = heading[0].querySelectorAll('.o-overlay__close');
				const testBody = content[0].querySelectorAll('.test-overlay');

				expect(wrapper.length).to.equal(1);
				expect(content.length).to.equal(1);
				expect(shadow.length).to.equal(1);
				expect(heading.length).to.equal(1);
				expect(close.length).to.equal(1);
				expect(testBody.length).to.equal(1);

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

			o.fireEvent(trigger, 'click');

			function overlayReadyHandler() {
				o.fireEvent(document.querySelector('.o-overlay__close'), 'click');
				o.fireEvent(document.body, 'click');
				o.fireEvent(document.body, 'keyup', {
					keyCode: 27
				});
				o.fireCustomEvent(document.body, 'oLayers.new');

				expect(Overlay.prototype.close.callCount).to.be(3);

				Overlay.prototype.close = realCloseFunction;
				currentOverlay.close();

				document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);
				done();
			}

			document.body.addEventListener('oOverlay.ready', overlayReadyHandler);
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

			expect(Overlay.prototype.close.callCount).to.be(4);

			Overlay.prototype.close = realCloseFunction;
			currentOverlay.close();
		});

		it('should remove all traces on close', function() {
			const trigger = document.querySelector('.o-overlay-trigger');
			trigger.setAttribute('data-o-overlay-modal', 'false');
			Overlay.init();

			o.fireEvent(trigger, 'click');

			o.fireEvent(document.querySelector('.o-overlay__close'), 'click');

			expect(document.querySelectorAll('.o-overlay').length).to.be(0);

			Overlay.destroy();

			o.fireEvent(trigger, 'click');
			expect(document.querySelectorAll('.o-overlay').length).to.be(0);

			sinon.spy(Overlay.prototype, 'close');
			sinon.spy(Overlay.prototype, 'realign');
			sinon.spy(Overlay.prototype, 'resizeListener');
			sinon.spy(Overlay.prototype, 'closeOnExternalClick');
			sinon.spy(Overlay.prototype, 'closeOnEscapePress');

			o.fireCustomEvent(document.body, 'oViewport.resize');
			o.fireCustomEvent(document.body, 'oLayers.new');
			o.fireEvent(document.body, 'click');
			o.fireEvent(document.body, 'keyup');

			expect(Overlay.prototype.close.callCount).to.be(0);
			expect(Overlay.prototype.realign.callCount).to.be(0);
			expect(Overlay.prototype.resizeListener.callCount).to.be(0);
			expect(Overlay.prototype.closeOnExternalClick.callCount).to.be(0);
			expect(Overlay.prototype.closeOnEscapePress.callCount).to.be(0);

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
			expect(overlays.length).to.be(1);
			mod.close();
			overlays = document.querySelectorAll('.o-overlay');
			expect(overlays.length).to.be(0);
		});

		it('should open and close with correct aria attributes', done => {
			const trigger = document.querySelector('.o-overlay-trigger');
			o.fireEvent(trigger, 'click');

			Overlay.init();

			function overlayReadyHandler() {
				const wrapper = document.querySelectorAll('.o-overlay');
				const wrapperRole = wrapper[0].getAttribute('role');
				expect(wrapperRole).to.contain('dialog');

				const wrapperLabel = wrapper[0].getAttribute('aria-labelledby');
				expect(wrapperLabel).to.be.ok();
				expect(wrapperLabel).to.not.contain(' ');

				let triggerPressed = trigger.getAttribute('aria-pressed');
				expect(triggerPressed).to.contain('true');

				Overlay.getOverlays()['testOverlay'].close();
				document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);

				triggerPressed = trigger.getAttribute('aria-pressed');
				expect(triggerPressed).to.contain('false');

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
		expect(overlays.length).to.be(1);
		mod.close();
		overlays = document.querySelectorAll('.o-overlay');
		expect(overlays.length).to.be(0);
		document.body.removeChild(scriptEl);
	});

	it('should be able to inject content from a url', done => {
		const mod = new Overlay('testOverlay', {
			src: 'https://origami-build.ft.com/files/o-card@2.2.3/demos/standard.html',
			trigger: document.querySelector('.o-overlay-trigger')
		});

		function overlayReadyHandler() {
			let overlays = document.querySelectorAll('.o-overlay');
			expect(overlays.length).to.be(1);

			expect(mod.content.innerHTML).to.contain('<div class="o-card__container">');

			mod.close();
			overlays = document.querySelectorAll('.o-overlay');
			expect(overlays.length).to.be(0);
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
		expect(overlays.length).to.be(1);

		mod.close();
	});
});
