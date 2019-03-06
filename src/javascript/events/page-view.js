/*global module, require */
/*eslint-disable*/
'use strict';

/*eslint-enable*/

import Core from '../core';

import utils from '../utils';
import settings from '../core/settings';

settings.set('page_viewed', false);

/**
 * Default properties for page tracking requests.
 *
 * @return {Object} - The default properties for pages.
 */
const defaultPageConfig = function () {
	return {
		category: 'page',
		action: 'view',
		context: {
			url: document.URL,
			referrer: document.referrer
		},

		async: true // Send this event asyncronously - as sync doesn't work in FF, as it doesn't send cookies. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#withCredentials
	};
};

/**
 * Make the page tracking request.
 *
 * @param {Object} config - Configuration object. If omitted, will use the defaults.
 * @param {Function} callback - Callback function. Called when request completed.
 * @return {undefined}
 */
function page(config, callback) {
	config = utils.merge(defaultPageConfig(), {
		context: config
	});

	// New PageID for a new Page... Unless... It's the first pageview, and some events may have been sent before this.
	if(settings.get('page_viewed')) {
		Core.setRootID();
	}

	Core.track(config, callback);

	// Alert internally that a new page has been tracked - for single page apps for example.
	settings.set('page_viewed', true);
	utils.triggerPage();
}

/**
 * Listener for pages.
 *
 * @param {CustomEvent} e - The CustomEvent
 * @private
 * @return {undefined}
 */
function listener(e) {
	page(e.detail);
}

const init = function init() {
	utils.addEvent(window, 'oTracking.page', listener);
};
page.init = init;
export default page;
export { page };
