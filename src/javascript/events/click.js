/*global module, require */
'use strict'; // eslint-disable-line strict

const Delegate = require('ftdomdelegate');
const Queue = require('../core/queue');
const Core = require('../core');
const utils = require('../utils');
const settings = require('../core/settings');

let internalQueue;

const elementPropertiesToCollect = [
	"nodeName",
	"className",
	"id",
	"href",
	"text",
	"role",
];

const eventPropertiesToCollect = [
	"ctrlKey",
	"altKey",
	"shiftKey",
	"metaKey",
];

// Trigger the event tracking
const track = eventData => {
	const firstDomPathToken = eventData.context.domPathTokens[0];
	const href = firstDomPathToken.href || null;
	const oTrackingSkipQueueAttr = firstDomPathToken['data-o-tracking-skip-queue'];
	const skipQueue = (oTrackingSkipQueueAttr && oTrackingSkipQueueAttr.toLowerCase() === 'true') || false;
	const isInternal = href && href.indexOf(window.document.location.hostname) > -1;

	if (isInternal && !skipQueue) {
		eventData.context.source_id = Core.getRootID();

		// Queue the event and send it on the next page load
		internalQueue.add(eventData).save();
	}
	else {
		// Send now, before leaving this page
		eventData.async = false;
		Core.track(eventData);
	}
};

// Utility for trimming strings
const sanitise = property => {
	return typeof property === 'string' ? property.trim() : property;
};

// For a given container element, get the number of elements that match the
// clicked element (siblings); and the index of the clicked element (position).
const getSiblingsAndPosition = (el, clickedEl, selector) => {
	const siblings = Array.from(el.querySelectorAll(selector));
	const position = siblings.findIndex(item => item === clickedEl);
	if(position === -1) {return;}
	return {
		siblings: siblings.length,
		position,
	};
};

// Get all (sanitised) properties of a given element.
const getAllElementProperties = el => {
	return elementPropertiesToCollect.reduce((returnObject, property) => {
		if (el[property]) {
			returnObject[property] = sanitise(el[property]);
		}
		else if (el.getAttribute(property)) {
			returnObject[property] = sanitise(el.getAttribute(property));
		}
		else if (el.hasAttribute(property)) {
			returnObject[property] = el.hasAttribute(property);
		}
		return returnObject;
	}, {});
};

// Get some properties of a given element.
const getDomPathProps = (attrs, props) => {

	// Collect any attribute that matches given strings.
	attrs
		.filter(attribute => attribute.name.match(/^data-trackable|^data-o-|^aria-/i))
		.forEach(attribute => {
			props[attribute.name] = attribute.value;
		});

	return props;
};

// Get only the custom data-trackable-context-? properties of a given element
const getContextProps = (attrs, props, isClickedEl) => {

	const customProps = {};

	// for the clicked element collect properties like className, nodeName
	if (isClickedEl) {
		elementPropertiesToCollect.forEach(name => {
			if (typeof props[name] !== 'undefined' && name !== 'id') {
				customProps[name] = props[name];
			}
		});
	}

	// Collect any attribute that matches given strings.
	attrs
		.filter(attribute => attribute.name.match(/^data-trackable-context-/i))
		.forEach(attribute => {
			customProps[attribute.name.replace('data-trackable-context-', '')] = attribute.value;
		});

	return customProps;
};

const assignIfUndefined = (subject, target) => {
	for (const prop in subject) {
		if (!target[prop]) {
			target[prop] = subject[prop];
		} else {
			console.warn(`You can't set a custom property called ${prop}`);
		}
	}
};

// Trace the clicked element and all of its parents, collecting properties as we go
const getTrace = el => {
	const rootEl = document;
	const clickedEl = el;
	const selector = clickedEl.getAttribute('data-trackable') ? `[data-trackable="${clickedEl.getAttribute('data-trackable')}"]` : clickedEl.nodeName;
	const trace = [];
	const customContext = {};
	while (el && el !== rootEl) {
		const props = getAllElementProperties(el);
		const attrs = Array.from(el.attributes);
		let domPathProps = getDomPathProps(attrs, props);

		// If the element happens to have a data-trackable attribute, get the siblings
		// and position of the clicked element (relative to the current element).
		if (domPathProps["data-trackable"]) {
			domPathProps = Object.assign(
				domPathProps,
				getSiblingsAndPosition(el, clickedEl, selector)
			);
		}

		trace.push(domPathProps);

		const contextProps = getContextProps(attrs, props, el === clickedEl);

		assignIfUndefined(contextProps, customContext);

		el = el.parentNode;
	}
	return { trace, customContext };
};

// Get properties for the event (as opposed to properties of the clicked element)
// Available properties include mouse x- and y co-ordinates, for example.
const getEventProperties = event => {
	const eventProperties = eventPropertiesToCollect.reduce((returnObject, property) => {
		try {
			if (event[property]) {returnObject[property] = sanitise(event[property]);}
		}
		catch (e) {
			console.log(e);
		}
		return returnObject;
	}, {});
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
	const config = utils.merge(settings.get('config'), eventData);
	track(config);
};

/**
 * If there are any requests queued, attempts to send the next one
 * Otherwise, does nothing
 * @return {undefined}
 */
/*eslint-disable no-unused-vars*/
const runQueue = _ => {
	const next = _ => { runQueue(); };
	const nextLink = internalQueue.shift();
	if (nextLink) {
		Core.track(nextLink, next);
	}
};
/*eslint-enable no-unused-vars*/

/**
 * Listen for click events.
 *
 * @alias click#init
 * @param {String} category - The event category for clicks.
 * @param {String} elementsToTrack - A query selector string to select elements to track links on {@link https://github.com/ftlabs/ftdomdelegate#selector-string}.
 * @return {undefined}
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
	utils.onPage(runQueue);
};

module.exports = {
	init: init
};
