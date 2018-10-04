const oCommentUtilities = require('o-comment-utilities');

const QUEUE_KEY = 'fyre-action-queue';

/**
 * Livefyre creates a queue in localStorage when a user posts a comment without being logged in.
 * This method clears the queue.
 * @return {undefined}
 */
exports.emptyLivefyreActionQueue = function () {
	oCommentUtilities.storageWrapper.localStorage.removeItem(QUEUE_KEY);
};

exports.isLivefyreActionQueuePresent = function () {
	return Boolean(oCommentUtilities.storageWrapper.localStorage.getItem(QUEUE_KEY));
};

/**
 * Detects if the URL is a Livefyre permalink. This can be used to override the lazy loading of the widget.
 * @return {Boolean} Returns if permalink is present or not
 */
exports.isPermalinkPresent = function () {
	if (document.location.hash) {
		if (document.location.hash.indexOf('lf-content') !== -1 || document.location.hash.indexOf('lf_comment') !== -1) {
			return true;
		}
	}

	if (document.location.search) {
		if (document.location.search.indexOf('hubRefSrc=permalink') !== -1) {
			return true;
		}
	}

	return false;
};

/**
 * Clones a plain object by serializing and deserializing an object to JSON.
 * @param  {object} obj Object to be cloned.
 * @return {object} Cloned object
 */
exports.cloneObject = function (obj) {
	return JSON.parse(JSON.stringify(obj));
};
