import {xhr} from './xhr.js';
import {sendBeacon} from './send-beacon.js';
import {image} from './image.js';

export {
	xhr,
	sendBeacon,
	image
};

/**
 * @type {object|undefined} - mock transport for testing
 */
export const mock = {};

/**
 * Given the name of a transport, returns that transport if it exists.
 *
 * @param {string} name - The name of the transport to use
 * @returns {Function|undefined} - The transport function or undefined if not found.
 */
export function get(name) {
	if (mock.transport) {
		return mock.transport;
	}
	switch (name) {
		case 'xhr': {
			return xhr;
		}
		case 'sendBeacon': {
			return sendBeacon;
		}
		case 'image': {
			return image;
		}
		default: {
			return undefined;
		}
	}
}
