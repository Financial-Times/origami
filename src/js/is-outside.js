function getNonMatcher(container) {
	if (typeof container === 'string') {
		return function (el) {
			return el && el !== document && !el.matches(container);
		};
	}

	return function (el) {
		return el && el !== document && el !== container;
	};
}

module.exports = function (el, container) {
	const doesntMatch = getNonMatcher(container);

	while (doesntMatch(el)) {
		el = el.parentNode;
	}

	return !el || el === document;
};
