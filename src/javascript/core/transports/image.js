const utils = require('../../utils');

module.exports = function () {
	const image = new Image(1,1);

	return {
		name: 'image',
		send: function (url, data) {
			image.src = url + (url.indexOf('?') > -1 ? '&' : '?') + 'data=' + utils.encode(data);
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
