/*global require, describe, it, before, after, sinon, document */

const assert = require("assert");
const Queue = require("../../src/javascript/core/queue");
const settings = require("../../src/javascript/core/settings");
const send = require("../../src/javascript/core/send");
const core = require("../../src/javascript/core");
const click = require("../../src/javascript/events/click");
const session = require("../../src/javascript/core/session");

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
		new Queue('requests').replace([]);  // Empty the queue
		settings.destroy('config');  // Empty settings.
	});

	it('should track an event for a click', function (done) {

		sinon.spy(core, 'track');

		click.init("blah");

		const aLinkToGoogle = document.createElement('a');

		aLinkToGoogle.href = "http://www.google.com";
		aLinkToGoogle.text = "A link to Google's website";
		aLinkToGoogle.id = "anchorA";

		aLinkToGoogle.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		let event = new MouseEvent('click', {
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

		click.init("blah");

		const aLinkToGoogle = document.createElement('a');

		aLinkToGoogle.href = "http://www.google.com";
		aLinkToGoogle.text = "A link to Google's website";
		aLinkToGoogle.id = "anchorA";
		aLinkToGoogle.setAttribute('data-trackable-context-foo', 'bar');

		aLinkToGoogle.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		let event = new MouseEvent('click', {
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

		click.init("blah");

		const aLinkToSecuredrop = document.createElement('a');

		aLinkToSecuredrop.href = "https://www.ft.com/securedrop";
		aLinkToSecuredrop.text = "A link to securedrop";
		aLinkToSecuredrop.id = "anchorB";
		aLinkToSecuredrop.setAttribute("data-o-tracking-do-not-track", "true");

		aLinkToSecuredrop.addEventListener('click', function(e){
			e.preventDefault();
		}); //we don't want the browser to follow click in test

		let event = new MouseEvent('click', {
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

});
