import utils from './src/utils';

const throttle = utils.throttle;
const debounce = utils.debounce;

const listeners = {};
const intervals = {
	resize: 100,
	orientation: 100,
	visibility: 100,
	scroll: 100
};

/**
 *
 * @param {string} eventType - The type of event to throttle for this duration.
 * @param {number} interval - The duration to throttle in ms.
 * @example
 * 	   // throttle for different events at different durations
 *     setThrottleInterval('scroll', 100)
 *     setThrottleInterval('resize', 300)
 *     setThrottleInterval('orientation', 30)
 *     setThrottleInterval('visibility', 30)
 * 		// throttle all events at 30ms
 *     setThrottleInterval(30);
 */
function setThrottleInterval(eventType, interval) {
	if (typeof arguments[0] === 'number') {
		setThrottleInterval('scroll', arguments[0]);
		setThrottleInterval('resize', arguments[1]);
		setThrottleInterval('orientation', arguments[2]);
		setThrottleInterval('visibility', arguments[3]);
	} else if (interval) {
		intervals[eventType] = interval;
	}
}

/**
 * @access private
 */
function listenToResize() {
	if (listeners.resize) {
		return;
	}
	const eventType = 'resize';
	const handler = debounce(function(ev) {
		utils.broadcast('resize', {
			viewport: utils.getSize(),
			originalEvent: ev
		});
	}, intervals.resize);


	window.addEventListener(eventType, handler);
	listeners.resize = {
		eventType: eventType,
		handler: handler
	};
}

/**
 * @access private
 */
function listenToOrientation() {

	if (listeners.orientation) {
		return;
	}

	const eventType = 'orientationchange';
	const handler = debounce(function(ev) {
		utils.broadcast('orientation', {
			viewport: utils.getSize(),
			orientation: utils.getOrientation(),
			originalEvent: ev
		});
	}, intervals.orientation);

	window.addEventListener(eventType, handler);
	listeners.orientation = {
		eventType: eventType,
		handler: handler
	};
}

/**
 * @access private
 */
function listenToVisibility() {

	if (listeners.visibility) {
		return;
	}

	const eventType = 'visibilitychange';
	const handler = debounce(function(ev) {
		utils.broadcast('visibility', {
			hidden: utils.getVisibility(),
			originalEvent: ev
		});
	}, intervals.visibility);

	window.addEventListener(eventType, handler);

	listeners.visibility = {
		eventType: eventType,
		handler: handler
	};
}

/**
 * @access private
 */
function listenToScroll() {

	if (listeners.scroll) {
		return;
	}

	const eventType = 'scroll';
	const handler = throttle(function(ev) {
		const scrollPos = utils.getScrollPosition();
		utils.broadcast('scroll', {
			viewport: utils.getSize(),
			scrollHeight: scrollPos.height,
			scrollLeft: scrollPos.left,
			scrollTop: scrollPos.top,
			scrollWidth: scrollPos.width,
			originalEvent: ev
		});
	}, intervals.scroll);

	window.addEventListener(eventType, handler);
	listeners.scroll = {
		eventType: eventType,
		handler: handler
	};
}

/**
 * Start listening for an event(s).
 * @param {string} eventType - The event to start listening for. One of `resize`, `scroll`, `orientation`, `visibility` or `all`.
 * @example
 * 		// Start listening for all events.
 * 		oViewport.listenTo('all');
 *
 * 		// It is now possible to listen for debounce o-viewport events such as `oViewport.orientation`.
 *      document.body.addEventListener('oViewport.orientation', function(event) {
 *      	console.log(event.type); // oViewport.orientation
 *      });
 */
function listenTo(eventType) {
	if (eventType === 'resize' || eventType === 'all') {
		listenToResize();
	}

	if (eventType === 'scroll' || eventType === 'all') {
		listenToScroll();
	}

	if (eventType === 'orientation' || eventType === 'all') {
		listenToOrientation();
	}

	if (eventType === 'visibility' || eventType === 'all') {
		listenToVisibility();
	}
}

/**
 * Stop listening for an event(s).
 * @param {string} eventType - The event to stop listening for. One of `resize`, `scroll`, `orientation`, `visibility` or `all`.
 * @example
 * 		// Start listening for all events.
 * 		oViewport.listenTo('all');
 * 		// We're done. Stop listening for all events.
 * 		oViewport.stopListeningTo('all');
 */
function stopListeningTo(eventType) {
	if (eventType === 'all') {
		Object.keys(listeners).forEach(stopListeningTo);
	} else if (listeners[eventType]) {
		window.removeEventListener(listeners[eventType].eventType, listeners[eventType].handler);
		delete listeners[eventType];
	}
}

export default {
	debug: function () {
		utils.debug();
	},
	listenTo,
	stopListeningTo,
	setThrottleInterval,
	getOrientation: utils.getOrientation,
	getSize: utils.getSize,
	getScrollPosition: utils.getScrollPosition,
	getVisibility: utils.getVisibility
};
