import Delegate from 'ftdomdelegate';
import core from '../core.js';
import {sanitise, assignIfUndefined, merge } from '../utils.js';
import {get as getSetting} from '../core/settings.js';
import {getTrace} from '../../libs/get-trace.js';
import { Queue } from '../core/queue.js';

let delegate;

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
	// source_id is a field that is currently being used in some data analytics
	// before removing this field - check with the data analytics team first to see if it is still being used
	context.source_id = core.getRootID();

	assignIfUndefined(customContext, context);

	eventData.context = context;

	// Merge the event data into the "parent" config data
	const config = merge(getSetting('config'), eventData);
	core.track(config);
};

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
	delegate = delegate || new Delegate(document.body);
	delegate.on('click', elementsToTrack, handleClickEvent(eventData), true);

	// Fire all click events that were stored in the old queue used by o-tracking v2
	const clickQueue = new Queue('clicks');
	sendAllEventsFromQueue(clickQueue);
};

function sendAllEventsFromQueue(queue) {
	const nextLink = queue.shift();
	if (nextLink) {
		core.track(nextLink, () => sendAllEventsFromQueue(queue));
	}
}

const click = {
	init
};

export { click };
