import xhr from './xhr';
import sendBeacon from './send-beacon';
import image from './image';
const get = function (name) {
	return this.mock || this[name];
};

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
