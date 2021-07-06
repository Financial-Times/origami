/* eslint-env mocha */
/* global proclaim sinon */

import '../setup.js';

import {Queue} from '../../src/javascript/core/queue.js';
import {destroy, set} from '../../src/javascript/core/settings.js';
import {init as initSend} from '../../src/javascript/core/send.js';
import core from '../../src/javascript/core.js';
import {click} from '../../src/javascript/events/click.js';
import {init as initSession} from '../../src/javascript/core/session.js';

describe('click', function () {

	before(function () {
		initSession();
		initSend();

		const config = {
			context: {
				product: 'desktop'
			},
			user: {
				user_id: '123456'
			}
		};

		set("config",config);
	});

	beforeEach(function() {
		sinon.spy(core, 'track');
	});

	afterEach(function() {
		core.track.restore();
	});

	after(function () {
		new Queue('requests').replace([]); // Empty the queue
		destroy('config'); // Empty settings.
	});

	it('should track an event for a click stored on the old clicks queue', function (done) {
		const clcikEventStoredInQueue = {
			"created_at": 1625589236422,
			"item": {
				"server": "https://spoor-api.ft.com/ingest",
				"context": {
					"product": "desktop",
					"url": "https://www.example.com/",
					"href": "https://www.example.com/",
				},
				"action": "click",
				"category": "cta"
			}
		};
		// Add the click event to the old 'clicks' queue which o-tracking v2 uses
		new Queue('clicks').replace([clcikEventStoredInQueue]);

		click.init("blah", '#anchorA');
		setTimeout(() => {
			try {
				proclaim.equal(core.track.calledOnce, true, "click event tracked");
				proclaim.deepStrictEqual(core.track.firstCall.firstArg, clcikEventStoredInQueue);

				done();
			} catch (error) {
				done(error);
			}

		}, 10);

	});

	it('should track an event for a click', function (done) {

		click.init("blah", '#anchorA');
		const rootID = core.getRootID();

		const aLinkToGoogle = document.createElement('a');

		aLinkToGoogle.href = "http://www.google.com";
		aLinkToGoogle.text = "A link to Google's website";
		aLinkToGoogle.id = "anchorA";

		aLinkToGoogle.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToGoogle);
		aLinkToGoogle.dispatchEvent(event, true);

		setTimeout(() => {
			try {
				proclaim.equal(core.track.calledOnce, true, "click event tracked");
				proclaim.deepStrictEqual(core.track.firstCall.firstArg, {
					"context": {
						"product": "desktop",
						"domPathTokens": [
							{
								"nodeName": "A",
								"className": false,
								"id": "anchorA",
								"href": "http://www.google.com/",
								"text": "A link to Google's website",
								"role": false
							},
							{
								"nodeName": "BODY",
								"className": false,
								"id": false,
								"href": false,
								"text": false,
								"role": false
							},
							{
								"nodeName": "HTML",
								"className": false,
								"id": false,
								"href": false,
								"text": false,
								"role": false
							}
						],
						"url": window.location.toString(),
						"source_id": rootID,
						"nodeName": "A",
						"className": false,
						"href": "http://www.google.com/",
						"text": "A link to Google's website",
						"role": false
					},
					"user": {
						"user_id": "123456"
					},
					"action": "click",
					"category": "blah"
				});

				done();
			} catch (error) {
				done(error);
			}

		}, 10);

	});

	it('should add the root_id as the value to context.source_id', function (done) {

		click.init("blah", '#anchorB');
		const rootID = core.getRootID();

		const aLinkToGoogle = document.createElement('a');

		aLinkToGoogle.href = "http://www.google.com";
		aLinkToGoogle.text = "A link to Google's website";
		aLinkToGoogle.id = "anchorB";

		aLinkToGoogle.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToGoogle);
		aLinkToGoogle.dispatchEvent(event, true);

		setTimeout(() => {
			try {
				proclaim.equal(core.track.calledOnce, true, "click event tracked");
				proclaim.deepStrictEqual(core.track.firstCall.firstArg.context.source_id, rootID);

				done();
			} catch (error) {
				done(error);
			}

		}, 10);

	});

	it('should track custom event properties and send through in the context', (done) => {

		click.init("blah", '#anchorB');

		const aLinkToGoogle = document.createElement('a');

		aLinkToGoogle.href = "http://www.google.com";
		aLinkToGoogle.text = "A link to Google's website";
		aLinkToGoogle.id = "anchorB";
		aLinkToGoogle.setAttribute('data-trackable-context-foo', 'bar');

		aLinkToGoogle.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToGoogle);
		aLinkToGoogle.dispatchEvent(event, true);

		setTimeout(() => {
			try {
				proclaim.equal(core.track.getCall(0).args[0].context.foo, 'bar');


				done();
			} catch (error) {
				done(error);
			}
		}, 10);

	});

	it('should not track an event for a securedrop click', function (done) {

		click.init("blah", '#anchorC');

		const aLinkToSecuredrop = document.createElement('a');

		aLinkToSecuredrop.href = "https://www.ft.com/securedrop";
		aLinkToSecuredrop.text = "A link to securedrop";
		aLinkToSecuredrop.id = "anchorC";
		aLinkToSecuredrop.setAttribute("data-o-tracking-do-not-track", "true");

		aLinkToSecuredrop.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToSecuredrop);
		aLinkToSecuredrop.dispatchEvent(event, true);

		setTimeout(() => {

			try {
				proclaim.equal(core.track.notCalled, true, "click event not tracked");


				done();
			} catch (error) {
				done(error);
			}

		}, 10);

	});
});
