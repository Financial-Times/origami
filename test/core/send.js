/*global require, describe, it, document */
"use strict";

var assert = require('assert'),
	Send = require("../../src/javascript/core/send"),
	request = {
		// Setup
		environment: 'test',
		server: "trace.ft.com",
		channel: "desktop",
		// Page
		url: "http://www.ft.com/home/uk",
		referrer: document.referrer,
		uuid: "4c499f12-4e94-11de-8d4c-00144feabdc0",
		pageSubsLevel: "3",
		siteMap: "Sections.Front page",
		title: "World business, finance, and political news from the Financial Times - FT.com",
		assetType: "front",
		edition: "edition",
		brand: "brand",
		theme: "theme",
		searchQuery: 'search',
		campaign: 'campaign',
		// User
		cohort: 3,
		passportID: "4009049153",
		country: "GBR",
		region: "london",
		metroArea: "islington"
	};

// PhantomJS doesn't always create a "fresh" environment...
(new (require("../../src/javascript/core/queue"))('requests')).replace([]);
require("../../src/javascript/core/settings").delete('config');  // Empty settings.

describe('Core.Send', function () {

	it('should init first', function () {
		assert.doesNotThrow(function () {
			Send.init();
		});
	});

	it('should add a request', function () {
		assert.doesNotThrow(function () {
			Send.add(request);
		});
	});

	/*var test_request = nock('http://trace.ft.com')
	 .post('/')
	 .reply(200, 'ok');

	 it('should send the request', function () {
	 Send.run(function () {
	 assert.ok(test_request.isDone());
	 });
	 });*/
});
