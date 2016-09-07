/*global module, require */
'use strict';  // eslint-disable-line strict

const Delegate = require('ftdomdelegate');
const Queue = require('../core/queue');
const Core = require('../core');
let context = {};

// Trigger the event tracking
const track = _ => {

	console.log("collectedProperties",collectedProperties);


	if (!context.domPath || !context.domPath.length > 0) return false;

	var href = context.domPath[0].href || '';
	var isInternal = href.indexOf(window.document.location.hostname) > -1;

	if (isInternal) {
		console.log('Queue the event and send it on the next page load',context);
		debugger;
		// internalQueue.add(context).save();
	}
	else {
		console.log('Send now, before leaving this page',collectedProperties);

		Core.track({
			async: false,
			context: context
		});
	}
}

const sanitise = property => {
	return (typeof property === 'string') ? property.trim().toLowerCase() : property;
}

const getElementProperties = el => {

	// Todo: Consider capturing all properties that begin with "data-o-",
	// in case it's useful to see how origami components are being utilised
	const elementPropertiesToCollect = [
		"nodeName",
		"className",
		"id",
		"href",
		"text",
		"title",
		"role",
		"aria-controls",
		"aria-expanded",
		"data-trackable",
		"data-trackable-terminate",
		"data-o-component",
		"data-original-title",
	];
	let elementProperties = elementPropertiesToCollect.reduce((returnObject, property) => {
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
	},{});
	return elementProperties;
};

const getTrace = el => {
	const rootEl = document;
	let trace = [];
	let elementProperties;
	let siblings;
	while (el && el !== rootEl) {
		elementProperties = getElementProperties(el);
		trace.push(elementProperties);
		el = el.parentNode;
	}
	return trace;
};

// Get properties for the event
const getEventProperties = event => {
	event.preventDefault();
	const eventPropertiesToCollect = [
		"ctrlKey",
		"altKey",
		"shiftKey",
		"metaKey",
		"timeStamp",
	]
	let eventProperties = eventPropertiesToCollect.reduce((returnObject, property) => {
		try {
			if (event[property]) returnObject[property] = sanitise(event[property]);
		}
		catch (e) {
			console.log(e);
		}
		return returnObject;
	},{});
}

// Controller for handling click events
const handleClickEvent = clickEvent => {
	// const eventProperties = getEventProperties(clickEvent);
	const trace = getTrace(clickEvent.target);
	console.log(trace);
	// track(collectedProperties);
}

const init = (category, elementsToTrack) => {

	// Defaults for standard o-tracking.
	category = category || 'o-tracking';
	elementsToTrack = elementsToTrack || 'a, button, input'; // See https://github.com/ftlabs/ftdomdelegate#selector-string

	// Development debug info
	// console.log(`Now tracking click events. Category: ${category}`);
	// console.log(`Elements to track: ${elementsToTrack}`);
	// console.log(`Attributes to collect: ${theAttributesToCollect}`);

	// Note: `context` is the term o-tracking uses for the actual data that is sent to spoor.
	context.action = 'click';
	context.category = category;

	// Activte the click event listener
	let delegate = new Delegate(document.body);
	delegate.on('click', elementsToTrack, handleClickEvent, true);
}

module.exports = {
	init: init
};
