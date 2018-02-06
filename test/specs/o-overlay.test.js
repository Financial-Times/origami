/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../helpers/fixtures';

import oLayers from 'o-layers';
import Overlay from './../../main';

describe("Overlay", () => {

	describe("Constructor", () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
			Overlay.destroy();
		});

		it("Adds itself to the overlays array", () => {
			let testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.strictEqual(Overlay.getOverlays()['myID'], testOverlay);
		});

		it("Sets up delegates", () => {
			let testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.isTypeOf(testOverlay.delegates.doc, 'object');
			proclaim.isTypeOf(testOverlay.delegates.wrap, 'object');
			proclaim.isTypeOf(testOverlay.delegates.context, 'object');
		});

		it("Allows the heading to be optional", () => {
			let testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.strictEqual(testOverlay.heading, undefined);
		});

		it("Errors if html or src are not passed in as opts", () => {
			proclaim.throws(new Overlay('myID', {}));
			proclaim.throws(new Overlay('myID', {somethingElse: "hello"}));
			proclaim.isTypeOf(new Overlay('myID', {html: "hello"}), 'object');
			proclaim.isTypeOf(new Overlay('myID', {src: "hello"}), 'object');
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
			proclaim.throws(() => { new Overlay({html: 'hello', heading: {title: ''}}); });
		});

		it("Adds an event listener to the trigger if one has been set", () => {
			let openSpy = sinon.spy(Overlay.prototype, 'open');
			let closeSpy = sinon.spy(Overlay.prototype, 'close');
			document.getElementById('testTrigger').click();
			proclaim.isFalse(openSpy.called);
			proclaim.isFalse(closeSpy.called);

			new Overlay('myID', {html: 'hello', trigger: '#testTrigger'});

			document.getElementById('testTrigger').click();
			proclaim.isTrue(openSpy.called);
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

		it("Does not add state to history when not in full screen mode.", () => {
			const testOverlay = new Overlay('myID', { html: 'hello', fullscreen: false });
			testOverlay.open();
			proclaim.isNull(history.state);
		});

		it("Does not disable document scrolling when not in full screen mode.", (done) => {
			const testOverlay = new Overlay('myID', { html: 'hello' });
			testOverlay.open();
			setTimeout(() => {
				proclaim.equal('', document.body.style.overflow);
				done();
			}, 10);
		});

		it("Adds state to history when opened in full screen mode if supported.", () => {
			const testOverlay = new Overlay('myID', {html: 'hello', fullscreen: true});
			proclaim.isNull(history.state);
			testOverlay.open();
			if (window.history.pushState) {
				proclaim.equal(history.state.overlay, 'fullscreen');
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

		it("Disables document scrolling with an open full screen overlay.", (done) => {
			const testOverlay = new Overlay('myID', {html: 'hello'});
			testOverlay.open();
			setTimeout(() => {
				proclaim.equal('hidden', document.body.style.overflow);
				testOverlay.close();
				done();
			}, 10);
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
