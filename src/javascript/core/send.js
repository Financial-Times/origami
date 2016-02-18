/*global module, require, window */
/*eslint-disable*/
'use strict';
/*eslint-enable*/

const settings = require('./settings');
const utils = require('../utils');
const Queue = require('./queue');
const transports = require('./transports');
/**
 * Default collection server.
 */
let domain = 'http://test.spoor-api.ft.com';

/**
 * Queue queue.
 *
 * @type {Queue}
 */
let queue;

/**
 * Consistent check to see if we should use sendBeacon or not.
 *
 * @return {boolean}
 */
function should_use_sendBeacon() {
	return (navigator.sendBeacon && Promise && (settings.get('config') || {}).useSendBeacon);
	console.log(!!navigator.sendBeacon, !!Promise, !!(settings.get('config') || {}).useSendBeacon);
}

/**
 * Attempts to send a tracking request.
 *
 * @param {Object} request The request to be sent.
 * @param {Function} callback Callback to fire the next item in the queue.
 * @return {undefined}
 */
function sendRequest(request, callback) {
	const queueTime = request.queueTime;
	const offlineLag = new Date().getTime() - queueTime;
	let path;
	const transport = should_use_sendBeacon() ? transports.get('sendBeacon')() :
										window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest() ? transports.get('xhr')() :
										transports.get('image')();
	const user_callback = request.callback;

	const core_system = settings.get('config') && settings.get('config').system || {};
	const system = utils.merge(core_system, {
		api_key: settings.get('api_key'), // String - API key - Make sure the request is from a valid client (idea nicked from Keen.io) useful if a page gets copied onto a Russian website and creates noise
		version: settings.get('version'), // Version of the tracking client e.g. '1.2'
		source: settings.get('source'), // Source of the tracking client e.g. 'o-tracking'
	});

	request = utils.merge({ system: system }, request);

	// Only bothered about offlineLag if it's longer than a second, but less than 12 months. (Especially as Date can be dodgy)
	if (offlineLag > 1000 && offlineLag < (12 * 30 * 24 * 60 * 60 * 1000)) {
		request.time = request.time || {};
		request.time.offset = offlineLag;
	}
	delete request.callback;
	delete request.async;
	delete request.type;
	delete request.queueTime;

	utils.log('user_callback', user_callback);
	utils.log('PreSend', request);

	path = JSON.stringify(request);

	utils.log('path', path);

	transport.complete(function (error) {
		if (utils.is(user_callback, 'function')) {
			user_callback.call(request);
			utils.log('calling user_callback');
		}

		if (error) {
			// Re-add to the queue if it failed.
			// Re-apply queueTime here
			request.queueTime = queueTime;
			queue.add(request).save();

			utils.broadcast('oErrors', 'log', {
				error: error.message,
				info: { module: 'o-tracking' }
			});
		} else {
			callback && callback();
		}
	});

	// Both developer and noSend flags have to be set to stop the request sending.
	if (!(settings.get('developer') && settings.get('no_send'))) {
		transport.send(domain, path);
	}
}

/**
 * Adds a new request to the list of pending requests
 *
 * @param {Tracking} request The request to queue
 * @return {undefined}
 */
function add(request) {
	request.queueTime = (new Date()).getTime();
	if (should_use_sendBeacon()) {
		sendRequest(request);
	} else {
		queue.add(request).save();
	}
	utils.log('AddedToQueue', queue);
}

/**
 * If there are any requests queued, attempts to send the next one
 * Otherwise, does nothing
 * @param {Function} callback - Optional callback
 * @return {undefined}
 */
function run(callback) {
	if (utils.isUndefined(callback)) {
		callback = function () {};
	}

	const next = function () {
		run();
		callback();
	};
	const nextRequest = queue.shift();

	// Cancel if we've run out of requests.
	if (!nextRequest) {
		return callback();
	}

	// Send this request, then try run again.
	return sendRequest(nextRequest, next);
}

/**
 * Convenience function to add and run a request all in one go.
 *
 * @param {Object} request The request to queue and run.
 * @return {undefined}
 */
function addAndRun(request) {
	add(request);
	run();
}

/**
 * Init the queue and send any leftover events.
 * @return {undefined}
 */
function init() {
	queue = new Queue('requests');

	if (settings.get('config') && settings.get('config').server) {
		domain = settings.get('config').server;
	}

	// If any tracking calls are made whilst offline, try sending them the next time the device comes online
	utils.addEvent(window, 'online', run);

	// On startup, try sending any requests queued from a previous session.
	run();

	return queue;
}

module.exports = {
	init: init,
	add: add,
	run: run,
	addAndRun: addAndRun
};
