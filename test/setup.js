/* global sinon*/

const transports = require('../src/javascript/core/transports');

let willError = false;

module.exports.mockTransport = function () {
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
};

module.exports.unmockTransport = function () {
	transports.mock = null;
};

module.exports.errorNextSend = function () {
	willError = true;
};

// for the vast majority of tests we want to use a mock transport
// so we setup the mock globally here
module.exports.mockTransport();
