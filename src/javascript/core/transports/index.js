import xhr from './xhr';
import sendBeacon from './send-beacon';
import image from './image';

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
