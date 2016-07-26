const utils = require('../../utils');

module.exports = function () {
	const image = new Image(1,1);

	return {
		send: function (url, data) {
			image.src = url + '?data=' + utils.encode(data);
		},
		complete: function (callback) {
			if (image.addEventListener) {
				image.addEventListener('error', callback);
				image.addEventListener('load', () => callback());
			} else { // it's IE!
				image.attachEvent('onerror', callback);
				image.attachEvent('onload', () => callback());
			}
		}
	};
};
