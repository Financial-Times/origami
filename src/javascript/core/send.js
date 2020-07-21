import settings from './settings';
import utils from '../utils';
import Queue from './queue';
import transports from './transports';

const isIe11 = function () { return Boolean(window.MSInputMethodContext) && Boolean(document.documentMode); };
/**
 * Default collection server.
 */
let domain = 'https://spoor-api.ft.com/px.gif';

/**
 * Queue queue.
 *
 * @type {Queue}
 */
let queue;

/**
 * Consistent check to see if we should use sendBeacon or not.
 *
 * @return {boolean} Should we use sendBeacon?
 */
function should_use_sendBeacon() {
	return navigator.sendBeacon && Promise && (settings.get('config') || {}).useSendBeacon;
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

	const transport = should_use_sendBeacon() ? transports.get('sendBeacon')() :
		window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest() ? transports.get('xhr')() :
			transports.get('image')();
	const user_callback = request.callback;

	const core_system = settings.get('config') && settings.get('config').system || {};
	const system = utils.merge(core_system, {
		version: settings.get('version'), // Version of the tracking client e.g. '1.2'
		source: settings.get('source'), // Source of the tracking client e.g. 'o-tracking'
		transport: transport.name, // The transport method used.
	});

	request = utils.merge({ system: system }, request);

	// Only bothered about offlineLag if it's longer than a second, but less than 12 months. (Especially as Date can be dodgy)
	if (offlineLag > 1000 && offlineLag < 12 * 30 * 24 * 60 * 60 * 1000) {
		request.time = request.time || {};
		request.time.offset = offlineLag;
	}
	delete request.callback;
	delete request.async;
	delete request.type;
	delete request.queueTime;

	utils.log('user_callback', user_callback);
	utils.log('PreSend', request);

	const stringifiedData = JSON.stringify(request);

	transport.complete(function (error) {
		if (utils.is(user_callback, 'function')) {
			user_callback.call(request);
			utils.log('calling user_callback');
		}

		if (error) {
			// If IE11 XHR error, try using image method
			if (isIe11() && transport.name === 'xhr') {
				const image_method = transports.get('image')();
				// Append image label to transport value so that we know it tried xhr first
				request.system.transport = [request.system.transport,image_method.name].join('-');
				image_method.send(url, JSON.stringify(request));
				image_method.complete(function () {
					if (callback) {
						callback();
					}
				});
			} else {
				// Re-add to the queue if it failed.
				// Re-apply queueTime here
				request.queueTime = queueTime;
				queue.add(request).save();

				utils.broadcast('oErrors', 'log', {
					error: error.message,
					info: { module: 'o-tracking' }
				});
			}
		} else if (callback) {
			callback();
		}
	});
	let url = domain;

	if (request && request.category && request.action) {
		const type = `type=${request.category}:${request.action}`;
		url = url.indexOf('?') > -1 ? `${url}&${type}` : `${url}?${type}`;
	}

	// Both developer and noSend flags have to be set to stop the request sending.
	if (!(settings.get('developer') && settings.get('no_send'))) {
		transport.send(url, stringifiedData);
	}
}

/**
 * Adds a new request to the list of pending requests
 *
 * @param {Tracking} request The request to queue
 * @return {undefined}
 */
function add(request) {
	request.queueTime = new Date().getTime();
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
		// eslint-disable-next-line no-empty-function
		callback = function () {};
	}

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
				url: document.url,
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
 * @param {Object} request The request to queue and run.
 * @return {undefined}
 */
function addAndRun(request) {
	add(request);
	run();
}

function setDomain() {
	if (settings.get('config') && settings.get('config').server) {
		domain = settings.get('config').server;
	}
}

/**
 * Init a queue and send any leftover events.
 * @return {Queue} An initialised queue.
 */
function init() {
	queue = new Queue('requests');

	setDomain();

	// If any tracking calls are made whilst offline, try sending them the next time the device comes online
	utils.addEvent(window, 'online', function() {
		run();
	});

	// On startup, try sending any requests queued from a previous session.
	run();

	return queue;
}

function getDomain() {
	return domain;
}

export default {
	init,
	setDomain,
	getDomain,
	add,
	run,
	addAndRun
};
export {
	init,
	setDomain,
	getDomain,
	add,
	run,
	addAndRun
};
