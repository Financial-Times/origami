export default {
	xhr: require('./xhr'),
	sendBeacon: require('./send-beacon'),
	image: require('./image'),
	get: function (name) {
		return this.mock || this[name];
	}
};
