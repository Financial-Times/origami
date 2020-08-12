import Core from '../core';
import utils from '../utils';
import settings from '../core/settings';

settings.set('page_has_already_been_viewed', false);

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
		}
	};
};

/**
 * Make the page tracking request.
 *
 * @param {Object} config - Configuration object. If omitted, will use the defaults.
 * @param {Function=} callback - Callback function. Called when request completed.
 * @return {void}
 */
function page(config, callback) {
	config = utils.merge(defaultPageConfig(), {
		context: config
	});

	// Set a new root ID only if the page function has already been called once before.
	// This is because o-tracking assumes each page function call is for a different page being viewed
	// And o-tracking wants all other events on the page to share the same root_id so that Spoor can
	// relate those other events with the page view they were from.
	// If o-tracking events were fired before this `page` function was ever called, then the first
	// of those events would have created a `root_id` and we want the first page view event to reuse
	// that `root_id` so those earlier events can be related to the page view they were from.
	if (settings.get('page_has_already_been_viewed')) {
		Core.setRootID();
	}
	settings.set('page_has_already_been_viewed', true);

	Core.track(config, callback);

	// Alert internally that a new page has been tracked - for single page apps for example.
	utils.triggerPage();
}

/**
 * Listener for pages.
 *
 * @param {CustomEvent} e - The CustomEvent
 * @private
 * @return {void}
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
