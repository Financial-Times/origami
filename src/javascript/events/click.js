import Delegate from 'ftdomdelegate';
import {Queue} from '../core/queue.js';
import core from '../core.js';
import {sanitise, assignIfUndefined, merge, onPage} from '../utils.js';
import {get as getSetting} from '../core/settings.js';
import {getTrace} from '../../libs/get-trace.js';

let internalQueue;

// Trigger the event tracking
const track = eventData => {
	const firstDomPathToken = eventData.context.domPathTokens[0];
	const href = firstDomPathToken.href || null;
	const oTrackingSkipQueueAttr = firstDomPathToken['data-o-tracking-skip-queue'];
	// TODO: Decide if we should also allow the attribute without a value to mean the same as having a value of `'true'`.
	// TODO: Decide is all anchor elements with a download attribute should also skip the queue.
	const skipQueue = oTrackingSkipQueueAttr && oTrackingSkipQueueAttr.toLowerCase() === 'true' || false;
	const isInternal = href && href.indexOf(window.document.location.hostname) > -1;

	if (isInternal && !skipQueue) {
		eventData.context.source_id = core.getRootID();

		// Queue the event and send it on the next page load
		internalQueue.add(eventData).save();
	}
	else {
		// Send now, before leaving this page
		core.track(eventData);
	}
};

const eventPropertiesToCollect = [
	"ctrlKey",
	"altKey",
	"shiftKey",
	"metaKey",
];

// Get properties for the event (as opposed to properties of the clicked element)
// Available properties include mouse x- and y co-ordinates, for example.
const getEventProperties = event => {
	const eventProperties = {};
	for (const property of eventPropertiesToCollect) {
		if (event[property]) {
			try {
				eventProperties[property] = sanitise(event[property]);
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}
		}
	}

	return eventProperties;
};

// Controller for handling click events
const handleClickEvent = eventData => (clickEvent, clickElement) => {
	//we don't want to track clicks to anonymous services like securedrop
	if (clickElement.getAttribute("data-o-tracking-do-not-track") === "true") {return;}
	const context = getEventProperties(clickEvent);
	const { trace, customContext} = getTrace(clickElement);
	context.domPathTokens = trace;
	context.url = window.document.location.href || null;

	assignIfUndefined(customContext, context);

	eventData.context = context;

	// Merge the event data into the "parent" config data
	const config = merge(getSetting('config'), eventData);
	track(config);
};

/**
 * If there are any requests queued, attempts to send the next one
 * Otherwise, does nothing
 *
 * @returns {void}
 */
/*eslint-disable no-unused-vars*/
const runQueue = _ => {
	const next = _ => { runQueue(); };
	const nextLink = internalQueue.shift();
	if (nextLink) {
		core.track(nextLink, next);
	}
};
/*eslint-enable no-unused-vars*/

/**
 * Listen for click events.
 *
 * @alias click#init
 * @param {string} category - The event category for clicks.
 * @param {string} elementsToTrack - A query selector string to select elements to track links on {@link https://github.com/ftlabs/ftdomdelegate#selector-string}.
 * @returns {void}
 */
const init = (category, elementsToTrack) => {
	elementsToTrack = elementsToTrack || 'a, button, input, [role="button"]'; // See https://github.com/ftlabs/ftdomdelegate#selector-string

	// Note: `context` is the term o-tracking uses for the data that is sent to spoor
	const eventData = {
		action: 'click',
		category: category || 'o-tracking'
	};

	// Activate the click event listener
	const delegate = new Delegate(document.body);
	delegate.on('click', elementsToTrack, handleClickEvent(eventData), true);

	// Track any queued events
	internalQueue = new Queue('clicks');
	runQueue();

	// Listen for page requests. If this is a single page app, we can send link requests now.
	onPage(runQueue);
};

export {
	init
};
