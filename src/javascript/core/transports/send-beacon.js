/**
 * Beacon based transport mechanism
 *
 * @returns {object} - Object with three properties: name, send and complete
 */
function sendBeacon() {
	let resolver;
	let rejecter;
	const p = new Promise((resolve, reject) => {
		resolver = resolve;
		rejecter = reject;
	});
	return {
		name: 'sendBeacon',
		send: function (url, data) {
			if (navigator.sendBeacon(url, data)) {
				resolver();
			} else {
				rejecter(new Error('Failed to send beacon event: ' + data.toString()));
			}

		},
		complete: function (callback) {
			if (callback) {
				p.then(callback, callback);
			}
		}
	};
}

export { sendBeacon };
