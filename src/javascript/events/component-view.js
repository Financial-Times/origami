import core from '../core.js';
import {getTrace} from '../../libs/get-trace.js';
import {assignIfUndefined, filterProperties} from '../utils.js';

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

		const contextData = opts.getContextData(viewedEl);

		if (typeof contextData !== 'object') {
			throw new Error('opts.getContextData function should return {object}');
		}

		context = filterProperties(contextData, TRACKING_ATTRIBUTES);
	} else {
		context = {};
	}

	context.domPathTokens = trace;
	context.url = window.document.location.href || null;

	assignIfUndefined(customContext, context);

	eventData.context = context;
};

/**
 * Listen for view events.
 *
 * @alias view#init
 * @param {object} opts - To set custom category[String], selector[String], getContextData[Function]
 * @returns {undefined}
 */
const init = (opts = {}) => {
	if(!window.IntersectionObserver) {
		// eslint-disable-next-line no-console
		console.warn('o-tracking: Unable to track component view events as "window.IntersectionObserver" is not supported.');
		return;
	}

	const selector = opts.selector || '[data-o-tracking-view]';
	const elementsToTrack = [...document.querySelectorAll(selector)];

	if (!elementsToTrack.length) {
		return;
	}

	function onChange (changes) {
		changes.forEach(change => {
			if(change.isIntersecting || change.intersectionRatio > 0) {
				const eventData = {
					action: opts.action || 'view',
					category: opts.category || 'component'
				};
				const viewedEl = change.target;

				decorateEventData(eventData, viewedEl, opts);
				core.track(eventData);
				observer.unobserve(viewedEl);
			}
		});
	}

	const observer = new IntersectionObserver(onChange, { threshold: [ 1.0 ] });

	elementsToTrack.forEach(el => observer.observe(el));
};

const view = {
	init
};

export { view };


