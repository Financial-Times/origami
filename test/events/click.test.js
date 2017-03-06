/*global require, describe, it, before, after, sinon, document */

const assert = require("assert");
const Queue = require("../../src/javascript/core/queue");
const settings = require("../../src/javascript/core/settings");
const send = require("../../src/javascript/core/send");
const core = require("../../src/javascript/core");
const click = require("../../src/javascript/events/click");
const session = require("../../src/javascript/core/session");
const utils = require("../../src/javascript/utils");

describe('click', function () {

	before(function () {
		core.setRootID('page_id'); // Fix the click ID to stop it generating one.
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

		click.init("blah", "div");

		const aDiv = document.createElement('div');
		//const event = document.createEvent('HTMLEvents');

		aDiv.href = "http://www.google.com";
		aDiv.text = "A link to Google's website";
		aDiv.id = "anchor";

		var event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aDiv);
		aDiv.dispatchEvent(event, true);

		setTimeout(() => {

			assert.equal(core.track.calledOnce, true, "click event tracked");

			core.track.restore();
			done();

		}, 100);

	});

	it('should not track an event for a securedrop click', function (done) {

		sinon.spy(core, 'track');

		click.init("blah","div");

		const aDiv = document.createElement('div');

		aDiv.href = "https://www.ft.com/securedrop";
		aDiv.text = "A link to securedrop";
		aDiv.id = "anchor";

		var event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
		});

		document.body.appendChild(aDiv);
		aDiv.dispatchEvent(event, true);

		setTimeout(() => {

			assert.equal(core.track.notCalled, true, "click event not tracked");

			core.track.restore();
			done();

		}, 100);

	});

});
