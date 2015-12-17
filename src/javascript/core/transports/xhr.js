'use strict';

module.exports = function () {
	const xhr = new window.XMLHttpRequest();

	xhr.withCredentials = true;

	return {
		send: function (domain, path) {
			xhr.open('POST', domain, true);
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.send(path);
		},
		complete: function (callback) {
			xhr.onerror = callback;
			xhr.onload = () => callback();
		}
	};
}
