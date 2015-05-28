'use strict';

module.exports = function getDomPath(el, path) {
	path = path || [];
	if (!el.parentNode) {
		return path;
	}

	var trackable = el.getAttribute('data-trackable');

	if (trackable) {
		path.push(trackable);
	}

	if (el.hasAttribute('data-trackable-terminate')) {
		return path;
	}

	return getDomPath(el.parentNode, path);
};
