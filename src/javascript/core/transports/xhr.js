module.exports = function () {
	const xhr = new window.XMLHttpRequest();

	return {
		send: function (url, data) {
			console.log(data);
			if (data && data.data && data.data.category && data.data.action) {
				const type = `type=${data.data.category}:${data.data.action}`;
				url = url.indexOf('?') > -1 ? `${url}&${type}` : `${url}?${type}`
			}
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
