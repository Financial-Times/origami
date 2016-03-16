/* global require, afterEach, beforeEach, describe, it, expect, spyOn */

const o = require('../helpers/events');
let Overlay;
const testContent = '<div class="test-overlay"><span class="test-overlay__text">Hello Overlay</span></div>';

const chai = require('chai');
chai.use(require('chai-dom'));
const expect = chai.expect;
const sinon = require('sinon/pkg/sinon');

describe("smoke-tests (./overlay.js)", () => {

	beforeEach(() => {
		Overlay = require('../../src/js/overlay');
	});

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

		// it('should error', done => {
		// 	Overlay.init();
		// 	sinon.spy(Overlay.prototype, 'close');

		// 	const trigger = document.querySelector('.o-overlay-trigger');
		// 	o.fireEvent(trigger, 'click');

		// 	function overlayReadyHandler() {
		// 		o.fireEvent(document.querySelector('.o-overlay__close'), 'click');

		// 		console.log(Overlay.prototype.close.callCount);

		// 		expect(Overlay.prototype.close.callCount).to.equal(1);

		// 		document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);

		// 		done();
		// 	}

		// 	document.body.addEventListener('oOverlay.ready', overlayReadyHandler);

		// });

		// it('should open with correct content when trigger is clicked', done => {
		// 	const trigger = document.querySelector('.o-overlay-trigger');
		// 	o.fireEvent(trigger, 'click');
		// 	const overlays = document.querySelectorAll('.o-overlay');
		// 	expect(overlays.length).to.equal(0);

		// 	Overlay.init();

		// 	function overlayReadyHandler() {
		// 		const wrapper = document.querySelectorAll('.o-overlay');
		// 		const content = wrapper[0].querySelectorAll('.o-overlay__content');
		// 		const heading = wrapper[0].querySelectorAll('.o-overlay__heading');
		// 		const shadow = document.querySelectorAll('.o-overlay-shadow');
		// 		const close = heading[0].querySelectorAll('.o-overlay__close');
		// 		const testBody = content[0].querySelectorAll('.test-overlay');

		// 		expect(wrapper.length).to.equal(1);
		// 		expect(content.length).to.equal(1);
		// 		expect(shadow.length).to.equal(1);
		// 		expect(heading.length).to.equal(1);
		// 		expect(close.length).to.equal(1);
		// 		expect(testBody.length).to.equal(1);

		// 		Overlay.getOverlays()['testOverlay'].close();
		// 		document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);

		// 		done();
		// 	}

		// 	document.body.addEventListener('oOverlay.ready', overlayReadyHandler);

		// 	o.fireEvent(trigger, 'click');
		// });

		it('modal should be closable with esc key, close button and with new layer', done => {
			const trigger = document.querySelector('.o-overlay-trigger');
			sinon.stub(Overlay.prototype, 'close');
			Overlay.init();

			o.fireEvent(trigger, 'click');

			function overlayReadyHandler() {
				o.fireEvent(document.querySelector('.o-overlay__close'), 'click');
				o.fireEvent(document.body, 'click');
				o.fireEvent(document.body, 'keyup', {
					keyCode: 27
				});
				o.fireCustomEvent(document.body, 'oLayers.new');

				expect(Overlay.prototype.close.callCount).to.equal(3);

				const currentOverlay = Overlay.getOverlays()['testOverlay'];
				Overlay.prototype.close.restore();
				currentOverlay.close();

				document.body.removeEventListener('oOverlay.ready', overlayReadyHandler);
				done();
			}

			document.body.addEventListener('oOverlay.ready', overlayReadyHandler);
		});

	// 	it('non-modal should be closable in different ways', function() {
	// 		const trigger = document.querySelector('.o-overlay-trigger');
	// 		const originalOverlayClose = Overlay.prototype.close;
	// 		spyOn(Overlay.prototype, 'close');
	// 		trigger.setAttribute('data-o-overlay-modal', 'false');
	// 		Overlay.init();

	// 		o.fireEvent(trigger, 'click');
	// 		o.fireEvent(document.querySelector('.o-overlay__close'), 'click');
	// 		o.fireEvent(document.body, 'click');
	// 		o.fireEvent(document.body, 'keyup', {
	// 			keyCode: 27
	// 		});
	// 		o.fireCustomEvent(document.body, 'oLayers.new', {el: 'something'});

	// 		expect(Overlay.prototype.close.calls.count()).toBe(4);

	// 		const currentOverlay = Overlay.getOverlays()['testOverlay'];
	// 		currentOverlay.close = originalOverlayClose;
	// 		currentOverlay.close();
	// 	});

	// 	it('should remove all traces on close', function() {
	// 		const trigger = document.querySelector('.o-overlay-trigger');
	// 		trigger.setAttribute('data-o-overlay-modal', 'false');
	// 		Overlay.init();

	// 		o.fireEvent(trigger, 'click');

	// 		o.fireEvent(document.querySelector('.o-overlay__close'), 'click');

	// 		expect(document.querySelectorAll('.o-overlay').length).toBe(0);

	// 		Overlay.destroy();

	// 		o.fireEvent(trigger, 'click');
	// 		expect(document.querySelectorAll('.o-overlay').length).toBe(0);

	// 		spyOn(Overlay.prototype, 'close');
	// 		spyOn(Overlay.prototype, 'realign');
	// 		spyOn(Overlay.prototype, 'resizeListener');
	// 		spyOn(Overlay.prototype, 'closeOnExternalClick');
	// 		spyOn(Overlay.prototype, 'closeOnEscapePress');

	// 		o.fireCustomEvent(document.body, 'oViewport.resize');
	// 		o.fireCustomEvent(document.body, 'oLayers.new');
	// 		o.fireEvent(document.body, 'click');
	// 		o.fireEvent(document.body, 'keyup');

	// 		expect(Overlay.prototype.close).not.toHaveBeenCalled();
	// 		expect(Overlay.prototype.realign).not.toHaveBeenCalled();
	// 		expect(Overlay.prototype.resizeListener).not.toHaveBeenCalled();
	// 		expect(Overlay.prototype.closeOnExternalClick).not.toHaveBeenCalled();
	// 		expect(Overlay.prototype.closeOnEscapePress).not.toHaveBeenCalled();

	// 	});

	// 	it('should be possible to open and close imperatively', function() {
	// 		const mod = new Overlay('testOverlay', {
	// 			html: testContent,
	// 			trigger: document.querySelector('.o-overlay-trigger')
	// 		});
	// 		mod.open();

	// 		let overlays = document.querySelectorAll('.o-overlay');

	// 		expect(overlays.length).toBe(1);
	// 		mod.close();
	// 		overlays = document.querySelectorAll('.o-overlay');
	// 		expect(overlays.length).toBe(0);
	// 	});
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
		expect(overlays.length).to.equal(1);
		mod.close();
		overlays = document.querySelectorAll('.o-overlay');
		expect(overlays.length).to.equal(0);
		document.body.removeChild(scriptEl);
	});

	// it('should be able to inject content from a url', done => {
	// 	const mod = new Overlay('testOverlay', {
	// 		src: 'http://build.origami.ft.com/files/o-tweet@0.2.5/demos/demo.html',
	// 		trigger: document.querySelector('.o-overlay-trigger')
	// 	});
	// 	mod.open();

	// 	mod.context.addEventListener('oOverlay.ready', function() {
	// 		let overlays = document.querySelectorAll('.o-overlay');
	// 		expect(overlays.length).to.equal(1);

	// 		expect(mod.content.innerHTML).to.contain('<div class="o-tweet__h-card">');

	// 		mod.close();
	// 		overlays = document.querySelectorAll('.o-overlay');
	// 		expect(overlays.length).to.equal(0);
	// 		done();
	// 	});
	// });

	it('should add the unique id as a CSS styling hook', () => {
		const mod = new Overlay('test overlay', {
			html: testContent
		});
		mod.open();

		const overlays = document.querySelectorAll('.o-overlay--test-overlay');
		expect(overlays.length).to.equal(1);

		mod.close();
	});
});
