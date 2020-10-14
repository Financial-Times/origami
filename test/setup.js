/* global sinon*/

import {mock} from '../src/javascript/core/transports/index.js';

let willError = false;

export function mockTransport() {
	mock.transport = function () {
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
	delete mock.transport;
}

export function errorNextSend() {
	willError = true;
}

// for the vast majority of tests we want to use a mock transport
// so we setup the mock globally here
mockTransport();

