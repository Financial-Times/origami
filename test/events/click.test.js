/*global require, describe, it, before, after, sinon, document */
require('../setup');
import assert from "assert";
import Queue from "../../src/javascript/core/queue";
import settings from "../../src/javascript/core/settings";
import send from "../../src/javascript/core/send";
import core from "../../src/javascript/core";
import click from "../../src/javascript/events/click";
import session from "../../src/javascript/core/session";

describe('click', function () {

	before(function () {
		session.init();
		send.init(); // Init the sender.

		const config = {
			context: {
				product: 'desktop'
			},
			user: {
				user_id: '123456'
			}
		};

		settings.set("config",config);
	});

	after(function () {
		new Queue('requests').replace([]); // Empty the queue
		settings.destroy('config'); // Empty settings.
	});

	it('should track an event for a click', function (done) {

		sinon.spy(core, 'track');

		click.init("blah", '#anchorA');

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

			assert.equal(core.track.calledOnce, true, "click event tracked");

			core.track.restore();
			done();

		}, 10);

	});

	it('should track custom event properties and send through in the context', (done) => {

		sinon.spy(core, 'track');

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
			assert.equal(core.track.getCall(0).args[0].context.foo, 'bar');

			core.track.restore();
			done();
		}, 10);

	});

	it('should not track an event for a securedrop click', function (done) {

		sinon.spy(core, 'track');

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

			assert.equal(core.track.notCalled, true, "click event not tracked");

			core.track.restore();
			done();

		}, 10);

	});

	it('should not track straight away when the link points to the same domain we are currently on', function (done) {
		sinon.spy(core, 'track');

		click.init("blah", '#anchorD');

		core.track.resetHistory(); // click.init() makes a call to core.track() so clearing the history here to avoid false positives

		const aLinkToPageOnSameDomain = document.createElement('a');
		const currentHost = window.document.location.hostname;

		aLinkToPageOnSameDomain.href = "https://" + currentHost + "/a-page-on-the-same-domain";
		aLinkToPageOnSameDomain.text = "A link to another page on the same domain";
		aLinkToPageOnSameDomain.id = "anchorD";

		aLinkToPageOnSameDomain.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToPageOnSameDomain);
		aLinkToPageOnSameDomain.dispatchEvent(event, true);

		setTimeout(() => {
			assert.equal(core.track.notCalled, true, "click event not tracked");

			core.track.restore();
			done();

		}, 10);

	});

	it('should skip the queue when data-o-tracking-skip-queue is "true" on the link', function (done) {
		sinon.spy(core, 'track');

		click.init("blah", '#anchorE');

		core.track.resetHistory(); // click.init() makes a call to core.track() so clearing the history here to avoid false positives

		const aLinkToPageOnSameDomain = document.createElement('a');
		const currentHost = window.document.location.hostname;

		aLinkToPageOnSameDomain.href = "https://" + currentHost + "/a-page-on-the-same-domain";
		aLinkToPageOnSameDomain.text = "A link to another page on the same domain";
		aLinkToPageOnSameDomain.id = "anchorE";
		aLinkToPageOnSameDomain.setAttribute("data-o-tracking-skip-queue", "true");

		aLinkToPageOnSameDomain.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		const event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aLinkToPageOnSameDomain);
		aLinkToPageOnSameDomain.dispatchEvent(event, true);

		setTimeout(() => {
			assert.equal(core.track.calledOnce, true, "click event not tracked");

			core.track.restore();
			done();

		}, 10);

	});
});
