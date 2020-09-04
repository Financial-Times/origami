/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from '../helpers/fixtures.js';

import oLayers from 'o-layers';
import Overlay from './../../main.js';

describe("Overlay", () => {

	beforeEach(() => {
		fixtures.htmlCode();
	});

	afterEach(() => {
		Object.values(Overlay.getOverlays()).forEach(overlay => {
			overlay.destroy();
		});
		fixtures.reset();
	});

	describe("Constructor", () => {
		it("Adds itself to the overlays array", () => {
			const testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.strictEqual(Overlay.getOverlays()['myID'], testOverlay);
		});

		it("Sets up delegates", () => {
			const testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.isTypeOf(testOverlay.delegates.doc, 'object');
			proclaim.isTypeOf(testOverlay.delegates.wrap, 'object');
			proclaim.isTypeOf(testOverlay.delegates.context, 'object');
		});

		it("Allows the heading to be optional", () => {
			const testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.strictEqual(testOverlay.heading, undefined);
		});

		it("Errors if html or src are not passed in as opts", () => {
			proclaim.throws(new Overlay('myID1', {}));
			proclaim.throws(new Overlay('myID2', {somethingElse: "hello"}));
			proclaim.isTypeOf(new Overlay('myID3', {html: "hello"}), 'object');
			proclaim.isTypeOf(new Overlay('myID4', {src: "hello"}), 'object');
		});

		it("Converts trigger to a HTMLElement if it's a string", () => {
			const testOverlay = new Overlay('myID', {html: 'hello',trigger: "#overlay"});
			proclaim.notStrictEqual(testOverlay.opts.trigger, '#overlay');
			proclaim.strictEqual(testOverlay.opts.trigger, document.querySelector('#overlay'));
		});

		it("Throws if a heading is set but not a non empty title", () => {
			proclaim.throws(() => { new Overlay('myID', {html: 'hello', heading: {title: ''}}); });
			proclaim.throws(() => { new Overlay('myID', {html: 'hello', heading: {title: ' '}}); });
			proclaim.throws(() => { new Overlay('myID', {html: 'hello', heading: {title: {}}}); });
			proclaim.isTypeOf(new Overlay('myID', {html: 'hello', heading:  {title: 'hello'}}), 'object');
		});

		it("Sets the overlay to be modal by default", () => {
			const testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.isTrue(testOverlay.opts.modal);
		});

		it("Doesn't change opts.modal if it's set to false", () => {
			const testOverlay = new Overlay('myID', {html: 'hello', modal: false});
			proclaim.isFalse(testOverlay.opts.modal);
		});

		it("Throws if compact and heading and shaded are set", () => {
			proclaim.throws(() => { new Overlay('myID', {html: 'hello', compact: true, heading: {title: 'hello', shaded: true}}); });
			proclaim.isTypeOf(new Overlay('myID', {html: 'hello', heading: {title: 'hello', shaded: true}}), 'object');
		});

		it("Throws if no id is passed in", () => {
			proclaim.throws(() => { new Overlay({html: 'hello', heading: {title: 'hello'}}); });
		});

		it("Throws if id is not unique", () => {
			new Overlay('myID', {html: 'hello', heading: {title: 'hello'}});
			proclaim.throws(() => { new Overlay('myID', {html: 'hello', heading: {title: 'hello'}}); });
		});

		it("Adds an event listener to the trigger if one has been set", (done) => {
			const openSpy = sinon.spy(Overlay.prototype, 'open');
			const closeSpy = sinon.spy(Overlay.prototype, 'close');
			document.getElementById('testTrigger').click();
			proclaim.isFalse(openSpy.called);
			proclaim.isFalse(closeSpy.called);

			new Overlay('myID', {html: 'hello', trigger: '#testTrigger'});
			document.getElementById('testTrigger').click();
			setTimeout(() => {
				proclaim.isTrue(openSpy.called);
				Overlay.prototype.open.restore();
				Overlay.prototype.close.restore();
				done();
			}, 10);
		});

		it("Sets the context to the trigger if it's been set", () => {
			const testOverlay = new Overlay('myID', {html: 'hello', trigger: '#testTrigger'});
			proclaim.strictEqual(oLayers.getLayerContext(document.getElementById('testTrigger')), testOverlay.context);
		});

		it("Sets the context to the parentnode if it's been set but the trigger hasn't", () => {
			const testOverlay = new Overlay('myID', {html: 'hello', parentnode: '#element'});
			proclaim.strictEqual(document.querySelector('#element'), testOverlay.context);
		});

		it("Sets the context to the document body if there isn't a trigger or parentnode", () => {
			const testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.strictEqual(document.body, testOverlay.context);
		});
	});

	describe("Open", () => {
		it("Does not add state to history when not in full screen mode.", () => {
			const testOverlay = new Overlay('myID', { html: 'hello', fullscreen: false });
			testOverlay.open();
			proclaim.isNull(history.state);
		});

		it("Does not disable document scrolling when not in full screen or modal mode.", (done) => {
			const testOverlay = new Overlay('myID', { html: 'hello', fullscreen: false, modal: false });
			testOverlay.open();
			setTimeout(() => {
				const overlfow = document.documentElement.style.overflow;
				proclaim.equal(overlfow, '');
				done();
			}, 10);
		});

		it("Adds state to history when opened in full screen mode if supported.", () => {
			const testOverlay = new Overlay('myID', {html: 'hello', fullscreen: true});
			proclaim.isNull(history.state);
			testOverlay.open();
			if (window.history.pushState) {
				proclaim.equal(history.state[`o-overlay-${testOverlay.id}`], 'fullscreen');
			}
		});

		it("Removes state from history when opened in full screen mode if supported.", () => {
			const testOverlay = new Overlay('myID', {html: 'hello', fullscreen: true});
			sinon.spy(window.history, "back");
			testOverlay.open();
			testOverlay.close();
			if (window.history.pushState) {
				proclaim.isTrue(window.history.back.called);

			}
			window.history.back.restore();
		});

		it("Adds full screen class in full screen mode.", () => {
			const testOverlay = new Overlay('fullscreenClassTest', { html: 'hello', fullscreen: true });
			testOverlay.open();
			const overlay = document.querySelector('.o-overlay--fullscreenClassTest');
			proclaim.isTrue(overlay.classList.contains('o-overlay--full-screen'));
		});

		it("Disables document scrolling with an open modal overlay.", () => {
			const testOverlay = new Overlay('modalScrollTest', { html: 'hello', modal: true, fullscreen: false});
			testOverlay.open();
			proclaim.equal(document.documentElement.style.overflow, 'hidden');
		});

		it("Disables document scrolling with an open fullscreen overlay.", () => {
			const testOverlay = new Overlay('fullscreenScrollTest', { html: 'hello', modal: false, fullscreen: true});
			testOverlay.open();
			proclaim.equal(document.documentElement.style.overflow, 'hidden');
		});

		it("Adds custom classes to the overlay.", (done) => {
			const testOverlay = new Overlay('myID', {
				html: 'hello',
				class: 'myCustomClass mySecondCustomClass'
			});
			testOverlay.open();
			setTimeout(() => {
				proclaim.isTrue(document.querySelector('.o-overlay').classList.contains("myCustomClass"));
				proclaim.isTrue(document.querySelector('.o-overlay').classList.contains("mySecondCustomClass"));
				done();
			}, 10);
		});
	});

	describe("Realign", () => {
		it("Adds a height to overlay content if the overlay is larger than the viewport.", () => {
			const contentHeight = '3000px';
			const borders = 2;
			const testOverlay = new Overlay('contentHeightTest', { html: 'hello' });
			testOverlay.open();
			const overlayContent = document.querySelector('.o-overlay--contentHeightTest .o-overlay__content');
			// Demo sets no modal content so the modal is within the viewport, no content height should be set.
			proclaim.equal(overlayContent.style.height, '');

			// Model content now makes the modal larger than the viewport.
			overlayContent.innerHTML = `<div style="height:${contentHeight};">Very long content.</div>`;
			// Calling `realign` will now set a height so modal content is scrollable.
			// meaning the overlay will expand to the size of the viewport and allow scrolling for its child div, not become the size of the child div
			testOverlay.realign();

			const viewportHeight = window.innerHeight - borders + 'px';
			proclaim.equal(overlayContent.style.height, viewportHeight);
		});
	});

});

/* Functions to unit test
getOptionsFromTrigger
triggerClickHandler
Overlay.prototype.open
Overlay.prototype.loadContent
Overlay.prototype.render
Overlay.prototype.show
Overlay.prototype.close
Overlay.prototype.closeOnExternalClick
Overlay.prototype.closeOnEscapePress
Overlay.prototype.closeOnNewLayer
Overlay.prototype.resizeListener
Overlay.prototype.broadcast
Overlay.prototype.realign
Overlay.prototype.respondToWindow
Overlay.prototype.fills
Overlay.prototype.destroy
Overlay.prototype.getHeight
Overlay.prototype.getWidth
Overlay.destroy
Overlay.getOverlays */
