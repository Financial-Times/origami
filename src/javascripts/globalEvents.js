const on = function (eventName, eventNamespace, eventHandler) {
	document.body.addEventListener(eventNamespace + '.' + eventName, eventHandler);
};
exports.on = function (eventName, eventNamespace, eventHandler) {
	if (typeof eventNamespace === 'function') {
		eventHandler = eventNamespace;
		eventNamespace = 'oComments';
	}

	if (!eventNamespace) {
		eventNamespace = 'oComments';
	}

	if (document.body) {
		on(eventName, eventNamespace, eventHandler);
	} else {
		document.addEventListener('o.DOMContentLoaded', function () {
			on(eventName, eventNamespace, eventHandler);
		});
	}
};

const off = function (eventName, eventNamespace, eventHandler) {
	document.body.removeEventListener(eventNamespace + '.' + eventName, eventHandler);
};
exports.off = function (eventName, eventNamespace, eventHandler) {
	if (typeof eventNamespace === 'function') {
		eventHandler = eventNamespace;
		eventNamespace = 'oComments';
	}

	if (!eventNamespace) {
		eventNamespace = 'oComments';
	}

	if (document.body) {
		off(eventName, eventNamespace, eventHandler);
	} else {
		document.addEventListener('o.DOMContentLoaded', function () {
			off(eventName, eventNamespace, eventHandler);
		});
	}
};


const trigger = function (eventName, eventNamespace, data) {
	document.body.dispatchEvent(new CustomEvent(eventNamespace + '.' + eventName, {
		detail: data,
		bubbles: true
	}));
};
exports.trigger = function (eventName, eventNamespace, data) {
	if (typeof data === 'undefined') {
		data = eventNamespace;
		eventNamespace = 'oComments';
	}

	if (!eventNamespace) {
		eventNamespace = 'oComments';
	}

	if (document.body) {
		trigger(eventName, eventNamespace, data);
	} else {
		document.addEventListener('o.DOMContentLoaded', function () {
			trigger(eventName, eventNamespace, data);
		});
	}
};
