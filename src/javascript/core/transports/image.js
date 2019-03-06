import utils from '../../utils';

const image = function () {
	const image = new Image(1,1);

	return {
		name: 'image',
		send: function (url, data) {
			url = url.replace('https://spoor-api.ft.com/ingest', 'https://spoor-api.ft.com/px.gif');
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

export default image;
