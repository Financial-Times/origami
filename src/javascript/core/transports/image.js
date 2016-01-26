const utils = require('../../utils');

module.exports = function () {
	const image = new Image(1,1);

	return {
		send: function (domain, path) {
			image.src = domain + '?data=' + utils.encode(path);
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
}
