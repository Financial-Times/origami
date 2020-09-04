import xhr from './xhr.js';
import sendBeacon from './send-beacon.js';
import image from './image.js';

/**
 * Given the name of a transport, returns that transpor if it exists.
 *
 * @param {string} name
 * @returns {Function|undefined} - The transport function or undefined if not found.
 */
function get(name) {
	return this.mock || this[name];
}

export default {
	xhr,
	sendBeacon,
	image,
	get
};
export {
	xhr,
	sendBeacon,
	image,
	get
};
