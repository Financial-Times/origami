const nativeNonBubblers = ['error', 'blur', 'focus', 'scroll', 'resize'];

const fireEvent = function (el, event, data) {
	const evt = document.createEvent('HTMLEvents');
	evt.initEvent(event, !(nativeNonBubblers.indexOf(event) > -1), true); // jshint ignore:line
	if (data) {
		Object.keys(data).forEach(function (key) {
			evt[key] = data[key];
		});
	}
	el.dispatchEvent(evt);
};

const fireCustomEvent = function (el, event, data) {
	el.dispatchEvent(new CustomEvent(event, {
		detail: data,
		bubbles: true
	}));
};

export {
	fireEvent,
	fireCustomEvent
};
