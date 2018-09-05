module.exports = function () {
	const xhr = new window.XMLHttpRequest();

	return {
		name: 'xhr',
		send: function (url, data) {
			xhr.open('POST', url, true);
			xhr.withCredentials = true;
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.send(data);
		},
		complete: function (callback) {
			xhr.onerror = function () {
				callback(this);
			};
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					callback();
				} else {
					callback('Incorrect response: ' + xhr.status);
				}
			};
		}
	};
};
