/*global module, require, window */

const settings = require('./settings');
const utils = require('../utils');
const Queue = require('./queue');

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
 * Requests being sent right now.
 */
const currentRequests = {};

function createTransport() {
	try {
		const xmlHttp = new window.XMLHttpRequest();

		// Check if the XMLHttpRequest object has a 'withCredentials' property.
		// 'withCredentials' only exists on XMLHTTPRequest2 objects.
		if (!utils.isUndefined(xmlHttp.withCredentials)) {
			xmlHttp.withCredentials = true;

			return {
				send: function (domain, path) {
					xmlHttp.open('POST', domain, true);
					xmlHttp.setRequestHeader('Content-type', 'application/json');
					xmlHttp.send(path);
				},
				complete: function (callback) {
					xmlHttp.onerror = function () {
						callback(this, xmlHttp);
					};
					xmlHttp.onload = function () {
						if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
							callback(null, xmlHttp);
						} else {
							callback('Incorrect response: ' + xmlHttp.status, xmlHttp);
						}
					};
				}
			};
		}
	} catch (error) {
		utils.broadcast('oErrors', 'log', {
			error: error,
			info: { module: 'o-tracking' }
		});
	}

	const image = new Image(1,1);

	return {
		send: function (domain, path) {
			image.src = domain + '?data=' + utils.encode(path);
		},
		complete: function (callback) {
			if (image.addEventListener) {
				image.addEventListener('error', function () {
					callback(this, image);
				});
				image.addEventListener('load', function () {
					callback(null, image);
				});
			} else { // it's IE!
				image.attachEvent('onerror', function () {
					callback(this, image);
				});
				image.attachEvent('onload', function () {
					callback(null, image);
				});
			}
		}
	};
}

/**
 * Marks a request as current.
 *
 * @param {String} id The ID of the request.
 * @return {undefined}
 */
function started(id) {
	currentRequests[id] = true;
}

/**
 * Marks a request as no longer current.
 *
 * @param {String} id The ID of the request.
 * @return {undefined}
 */
function finished(id) {
	delete currentRequests[id];
}

/**
 * Marks a request as no longer current and removes it from the queue.
 *
 * @param {String} id The ID of the request.
 * @return {undefined}
 */
function success(id) {
	finished(id);

	const replacement = queue.all();
	let i;

	for (i = 0; i < replacement.length; i = i + 1) {
		if (id === replacement[i].id) {
			replacement.splice(i, 1);
			queue.replace(replacement).save();
			break;
		}
	}
}

/**
 * Attempts to send a tracking request.
 *
 * @param {Object} request The request to be sent.
 * @param {Function} callback Callback to fire the next item in the queue.
 * @return {undefined}
 */
function sendRequest(request, callback) {
	const offlineLag = (new Date()).getTime() - request.queueTime;
	let path;
	const transport = createTransport();
	const user_callback = request.callback;

	request = utils.merge({
		system: {
			api_key: settings.get('api_key'), // String - API key - Make sure the request is from a valid client (idea nicked from Keen.io) useful if a page gets copied onto a Russian website and creates noise
			version: settings.get('version'), // Version of the tracking client e.g. '1.2'
			source: settings.get('source'), // Source of the tracking client e.g. 'o-tracking'
		},

		context: {
			id: request.id, // ID of this request
			offset: 0 // Delay of this event between event happening and being sent to server - milliseconds
		}
	}, request);

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

	started(request.id);

	path = JSON.stringify(request);

	utils.log('path', path);

	transport.complete(function (error, t) {
		if (utils.is(user_callback, 'function')) {
			user_callback.call(request, t);
			utils.log('calling user_callback');
		}

		if (error) {
			utils.broadcast('oErrors', 'log', {
				error: error,
				info: { module: 'o-tracking' }
			});
			finished(request.id);
		} else {
			success(request.id);
			callback();
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

	queue.add(request).save();

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

	const next = function () { run(); callback(); };
	const nextRequest = queue.first();

	// Cancel if we've run out of requests.
	if (!nextRequest) {
		return callback();
	}

	// Cancel if the request is already started.
	if (currentRequests[nextRequest.id]) {
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
}

module.exports = {
	init: init,
	add: add,
	run: run,
	addAndRun: addAndRun
};
