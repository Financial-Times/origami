/* global sinon*/

import transports from '../src/javascript/core/transports';

let willError = false;

export function mockTransport() {
	transports.mock = function () {
		return {
			send: sinon.spy(),
			complete: function (callback) {
				if (willError) {
					willError = false;
					callback(new Error('mock error'));
				} else {
					callback();
				}
			}
		};
	};
}

export function unmockTransport() {
	transports.mock = null;
}

export function errorNextSend() {
	willError = true;
}

// for the vast majority of tests we want to use a mock transport
// so we setup the mock globally here
mockTransport();

export default {
	mockTransport,
	unmockTransport,
	errorNextSend
}