import {get as getSetting} from './settings.js';
import {broadcast, is, findCircularPathsIn, containsCircularPaths, merge, addEvent, log} from '../utils.js';
import {Queue} from './queue.js';
import {get as getTransport} from './transports/index.js';

/**
 * Queue queue.
 *
 * @type {Queue}
 */
let queue;

/**
 * Consistent check to see if we should use sendBeacon or not.
 *
 * @returns {boolean} Should we use sendBeacon?
 */
function should_use_sendBeacon() {
	return Boolean(navigator.sendBeacon);
}

/**
 * Attempts to send a tracking request.
 *
 * @param {object} request The request to be sent.
 * @param {Function=} callback Callback to fire the next item in the queue.
 * @returns {void}
 */
function sendRequest(request, callback) {
	const queueTime = request.queueTime;
	const offlineLag = new Date().getTime() - queueTime;

	const transport = should_use_sendBeacon() ? getTransport('sendBeacon')() :
		window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest() ? getTransport('xhr')() :
			getTransport('image')();
	const user_callback = request.callback;

	const core_system = getSetting('config') && getSetting('config').system || {};
	const system = merge(core_system, {
		version: getSetting('version'), // Version of the tracking client e.g. '1.2'
		source: getSetting('source'), // Source of the tracking client e.g. 'o-tracking'
		transport: transport.name, // The transport method used.
	});

	if (getSetting('config').test) {
		system.is_live = false;
	} else {
		system.is_live = true;
	}


	request = merge({ system: system }, request);

	// Only bothered about offlineLag if it's longer than a second, but less than 12 months. (Especially as Date can be dodgy)
	if (offlineLag > 1000 && offlineLag < 12 * 30 * 24 * 60 * 60 * 1000) {
		request.time = request.time || {};
		request.time.offset = offlineLag;
	}
	delete request.callback;
	delete request.type;
	delete request.queueTime;

	log('user_callback', user_callback);
	log('PreSend', request);

	if (containsCircularPaths(request)) {
		const errorMessage = "o-tracking does not support circular references in the analytics data.\n" +
		"Please remove the circular references in the data.\n" +
		"Here are the paths in the data which are circular:\n" +
		JSON.stringify(findCircularPathsIn(request), undefined, 4);
		throw new Error(errorMessage);
	}

	const stringifiedData = JSON.stringify(request);

	transport.complete(function (error) {
		if (is(user_callback, 'function')) {
			user_callback.call(request);
			log('calling user_callback');
		}

		if (error) {
			// Re-add to the queue if it failed.
			// Re-apply queueTime here
			request.queueTime = queueTime;
			queue.add(request).save();

			broadcast('oErrors', 'log', {
				error: error.message,
				info: { module: 'o-tracking' }
			});
		} else if (callback) {
			callback();
		}
	});
	/**
	 * Default collection server.
	 */
	let url = 'https://spoor-api.ft.com/px.gif';

	if (request && request.category && request.action) {
		url += `?type=${request.category}:${request.action}`;
	}

	transport.send(url, stringifiedData);
}

/**
 * Adds a new request to the list of pending requests
 *
 * @param {object} request The request to queue
 * @returns {void}
 */
function add(request) {
	request.queueTime = new Date().getTime();
	if (should_use_sendBeacon()) {
		sendRequest(request);
	} else {
		queue.add(request).save();
	}
	log('AddedToQueue', queue);
}

/**
 * If there are any requests queued, attempts to send the next one
 * Otherwise, does nothing
 *
 * @param {Function} [callback] - Optional callback
 * @returns {void}
 */
function run(callback = function () { /* empty */}) {
	// Investigate queue lengths bug
	// https://jira.ft.com/browse/DTP-330
	const all_events = queue.all();

	if (all_events.length > 200) {
		const counts = {};

		all_events.forEach(function (event) {
			const label = [event.category, event.action].join(':');

			if (!Object.prototype.hasOwnProperty.call(counts, label)) {
				counts[label] = 0;
			}

			counts[label] += 1;
		});

		queue.replace([]);

		queue.add({
			category: 'o-tracking',
			action: 'queue-bug',
			context: {
				url: document.URL,
				queue_length: all_events.length,
				counts: counts,
				storage: queue.storage.storage._type
			}
		});
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
 * @param {object} request The request to queue and run.
 * @returns {void}
 */
function addAndRun(request) {
	add(request);
	run();
}

/**
 * Init a queue and send any leftover events.
 *
 * @returns {Queue} An initialised queue.
 */
function init() {
	queue = new Queue('requests');

	// If any tracking calls are made whilst offline, try sending them the next time the device comes online
	addEvent(window, 'online', function() {
		run();
	});

	// On startup, try sending any requests queued from a previous session.
	run();

	return queue;
}

export {
	init,
	add,
	run,
	addAndRun
};
