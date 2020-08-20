import Core from '../core';
import {merge, triggerPage, addEvent, isDeepEqual} from '../utils';
import settings from '../core/settings';

settings.set('page_has_already_been_viewed', false);

/**
 * Default properties for page tracking requests.
 *
 * @returns {object} - The default properties for pages.
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
 * @param {object} config - Configuration object. If omitted, will use the defaults.
 * @param {Function=} callback - Callback function. Called when request completed.
 * @returns {void}
 */
function page(config, callback) {
	config = merge(defaultPageConfig(), {
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

	// Some applications which use o-tracking have a bug where they send thousands of page-view events
	// Instead of forwarding these errorneous events to Spoor, we ignore them.
	// GitHub Issue: https://github.com/Financial-Times/o-tracking/issues/296
	if (pageViewEventHasAlreadyBeenSentBefore(config)) {
		if (settings.get('config').test) {
			// eslint-disable-next-line no-console
			console.warn('A page event has already been sent for this page, refusing to send a duplicate page event.');
		}
	} else {
		Core.track(config, callback);
		// Alert internally that a new page has been tracked - for single page apps for example.
		triggerPage();
	}
}

let previousPageConfigWithoutContextIDs = {};

/**
 * Detect whether the previously sent page-view event is the
 * same as the page-view event which is about to be sent.
 *
 * @param {object} config - The page configuration object
 * @returns {boolean} - Whether the event has been sent before
 */
function pageViewEventHasAlreadyBeenSentBefore(config) {
	const configWithoutContextIDs = JSON.parse(JSON.stringify(config));
	delete configWithoutContextIDs.context.id;
	delete configWithoutContextIDs.context.root_id;

	if (isDeepEqual(previousPageConfigWithoutContextIDs, configWithoutContextIDs)) {
		return true;
	} else {
		previousPageConfigWithoutContextIDs = configWithoutContextIDs;
		return false;
	}
}

/**
 * Listener for pages.
 *
 * @param {CustomEvent} e - The CustomEvent
 * @private
 * @returns {void}
 */
function listener(e) {
	page(e.detail);
}

const init = function init() {
	addEvent(window, 'oTracking.page', listener);
};
page.init = init;
export default page;
export { page };
