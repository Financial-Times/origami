exports.trigger = function (domEl, error, additionalInfo) {
	const payload = {
		error: error
	};

	if (additionalInfo) {
		payload.info = additionalInfo;
	}

	domEl.dispatchEvent(new CustomEvent('oErrors.log', {
		detail: payload,
		bubbles: true
	}));
};
