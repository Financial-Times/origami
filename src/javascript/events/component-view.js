/*global module, require */
'use strict'; // eslint-disable-line strict

const Core = require('../core');
const getTrace = require('../../libs/get-trace');
const utils = require('../utils');

const TRACKING_ATTRIBUTES = [
	'componentContentId',
	'type',
	'subtype',
	'component',
];

const decorateEventData = (eventData, viewedEl, opts) => {

	const { trace, customContext } = getTrace(viewedEl);
	let context;

	if (opts.getContextData) {
		if (typeof opts.getContextData !== 'function') {
			throw new Error('opts.getContextData is not a function');
		}

		const dataBeforeWhitelist = opts.getContextData(viewedEl);

		if (typeof dataBeforeWhitelist !== 'object') {
			throw new Error('opts.getContextData function should return {Object}');
		}

		context = utils.whitelistProps(dataBeforeWhitelist, TRACKING_ATTRIBUTES);
	} else {
		context = {};
	}

	context.domPathTokens = trace;
	context.url = window.document.location.href || null;

	utils.assignIfUndefined(customContext, context);

	eventData.context = context;
};

/**
 * Listen for view events.
 *
 * @alias view#init
 * @param {Object} opts - To set custom category[String], selector[String], getContextData[Function]
 * @return {undefined}
 */
const init = (opts = {}) => {
	if(!window.IntersectionObserver) {
		return;
	}

	const selector = opts.selector || '[data-o-tracking-view]';
	const elementsToTrack = [...document.querySelectorAll(selector)];

	if (!elementsToTrack.length) {
		console.warn('o-tracking: Unable to track element view events as "window.IntersectionObserver" is not supported.');
		return;
	}

	function onChange (changes) {
		changes.forEach(change => {
			if(change.isIntersecting || change.intersectionRatio > 0) {
				const eventData = {
					action: 'view',
					category: opts.category || 'component'
				};
				const viewedEl = change.target;

				decorateEventData(eventData, viewedEl, opts);
				Core.track(eventData);
				this.unobserve(viewedEl);
			}
		});
	}

	const observer = new IntersectionObserver(onChange, { threshold: [ 1.0 ] });

	elementsToTrack.forEach(el => observer.observe(el));
};

module.exports = {
	init: init
};
