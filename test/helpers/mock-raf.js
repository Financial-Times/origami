export function createMockRaf () {
	let allCallbacks = {};
	let callbacksLength = 0;

	let now = 0;

	const getNow = function () {
		return now;
	};

	const raf = function (callback) {
		callbacksLength += 1;

		allCallbacks[callbacksLength] = callback;

		return callbacksLength;
	};

	const cancel = function (id) {
		delete allCallbacks[id];
	};

	const step = function (opts) {
		const options = Object.assign({
			time: 1000 / 60,
			count: 1
		}, opts);

		let oldAllCallbacks;

		for (let i = 0; i < options.count; i++) {
			oldAllCallbacks = allCallbacks;
			allCallbacks = {};

			now += options.time;

			for (const id of Object.keys(oldAllCallbacks)) {
				const callback = oldAllCallbacks[id];
				callback(now);
			}
		}
	};

	return {
		now: getNow,
		raf: raf,
		cancel: cancel,
		step: step
	};
}
