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
			xhr.onerror = function () {
				callback(this);
			}
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					callback();
				} else {
					callback('Incorrect response: ' + xhr.status);
				}
			}
		}
	};
}
