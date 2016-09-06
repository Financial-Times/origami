/*global module, require */
'use strict';  // eslint-disable-line strict

const Delegate = require('ftdomdelegate');
const Queue = require('../core/queue');
const Core = require('../core');

let context = {};
let collectedProperties = {};
const propertiesToCollect = [
	"ctrlKey",
	"altKey",
	"shiftKey",
	"metaKey",
	"timeStamp",
	{
		parent: "target",
		properties: [
			"href",
			"text",
			"nodeName",
		]
	},
	{
		name: "domPath",
		parent: "path",
		properties: [
			"nodeName",
			"text",
			{
				parent: "attributes",
				properties: [
					"href",
					"id",
					"class",
					"role",
					"aria-controls",
					"aria-expanded",
					"data-trackable",
					"data-o-toggle--js",
					"data-original-title",
					"title",
				]
			}
		]
	},
];

// Trigger the actual event tracking
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

const getProperties = (object, properties) => {
	properties.forEach(property => {
		if (typeof property === 'object') {
			if (Array.isArray(object)) {
				object.forEach(row => {
					return getProperties(row, property.properties);
				});
			}
			if (property.parent && object[property.parent]) {
				return getProperties(object[property.parent], property.properties);
			}
		}
		else if (typeof property === 'string' && object[property]) {
			collectedProperties[property] = object[property].toString().trim();
		}
	});
	return(collectedProperties);
}

// Controller for handling click events
const handleClickEvent = (clickEvent) => {
	console.log("clickEvent", clickEvent);

	// Todo: Promisify?
	getProperties(clickEvent, propertiesToCollect);

	track();
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
