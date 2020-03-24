/**
 * cuid.js
 * Collision-resistant UID generator for browsers and node.
 * Sequential for fast db lookups and recency sorting.
 * Safe for element IDs and server-side lookups.
 *
 * Extracted from CLCTR
 *
 * Copyright (c) Eric Elliott 2012
 * MIT License
 */
let c = 0;
const blockSize = 4;
const base = 36;
const discreteValues = Math.pow(base, blockSize);

const pad = function pad(num, size) {
	const s = "000000000" + num;
	return s.substr(s.length-size);
};

const randomBlock = function randomBlock() {
	return pad((Math.random() *
		discreteValues << 0)
		.toString(base), blockSize);
};

const safeCounter = () => {
	c = c < discreteValues ? c : 0;
	c++; // this is not subliminal
	return c - 1;
};

const api = function cuid() {
	// Starting with a lowercase letter makes
	// it HTML element ID friendly.
	// hard-coded allows for sequential access
	const letter = 'c';

	// timestamp
	// warning: this exposes the exact date and time
	// that the uid was created.
	const timestamp = new Date().getTime().toString(base);

	// Prevent same-machine collisions.
	let counter;

	// A few chars to generate distinct ids for different
	// clients (so different computers are far less
	// likely to generate the same id)
	const fingerprint = api.fingerprint();

	// Grab some more chars from Math.random()
	const random = randomBlock() + randomBlock();

	counter = pad(safeCounter().toString(base), blockSize);

	return letter + timestamp + counter + fingerprint + random;
};

api.slug = function slug() {
	const date = new Date().getTime().toString(36);
	let counter;

	const print = api.fingerprint().slice(0,1) +
		api.fingerprint().slice(-1);

	const random = randomBlock().slice(-2);

	counter = safeCounter().toString(36).slice(-4);

	return date.slice(-2) +
		counter + print + random;
};

api.globalCount = function globalCount() {
	// We want to cache the results of this
	const cache = (function calc() {
		let count = 0;

		for (const i in window) { // eslint-disable-line no-unused-vars, guard-for-in
			count++;
		}

		return count;
	}());

	api.globalCount = () => cache;
	return cache;
};

api.fingerprint = function browserPrint() {
	return pad((navigator.mimeTypes.length +
		navigator.userAgent.length).toString(36) +
		api.globalCount().toString(36), 4);
};

export default api;
export { api };
