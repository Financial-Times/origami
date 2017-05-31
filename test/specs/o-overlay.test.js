/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../helpers/fixtures';

const oLayers = require('o-layers');
const Overlay = require('./../../main');

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

		it("Sets the context to the parentNode if it's been set but the trigger hasn't", () => {
			const testOverlay = new Overlay('myID', {html: 'hello', parentNode: '#element'});
			proclaim.strictEqual(document.querySelector('#element'), testOverlay.context);
		});

		it("Sets the context to the document body if there isn't a trigger or parentNode", () => {
			const testOverlay = new Overlay('myID', {html: 'hello'});
			proclaim.strictEqual(document.body, testOverlay.context);
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
