/**
 * For tracking multiple events per page.
 * @module Track
 * @submodule event
 * @class Track.event
 * @static
 */

/*global module, require, window */
"use strict";

module.exports = (function (window) {

	var
		Core = require("./core"),
		utils = require("./utils"),

		/**
		 * Default properties for events.
		 * @property defaultEventConfig
		 * @type {Object}
		 * @private
		 */
		defaultEventConfig = {
			tag: { type: 'event' },
			event: {}
		};

	/**
	 * Track an event.
	 * @method event
	 * @param obj The event, for example: {
	 *   [parent_id] The ID from a parent event if one exists.
	 *   category The category, for example: video
	 *   action The action performed, for example: play
	 *   [key] Optional, a key for naming an arbitrary value. Examples include the video play amount - 50%, or slideshow slide number.
	 *   [value] Optional, the value. Examples include the video play amount - 50%, or slideshow slide number.
	 *   [data] Optional, other data related to the event.
	 * }
	 * @param [callback] {Function} Optional, Callback function. Called when request completed.
	 * @async
	 */
	function event(obj, callback) {
		if (utils.is(obj.category) || utils.is(obj.action)) {
			throw 'Missing category or action values';
		}

		if (!utils.is(obj.callback)) {
			if (utils.is(callback)) {
				callback = obj.callback;
			}
			delete obj.callback;
		}

		var config = utils.merge(utils.merge(defaultEventConfig), {
			event: obj
		});
		Core.track(config, callback);
	}

	utils.addEvent(window, 'oTracking.event', function (e) { event(e, e.callback); });

	return event;

}(window));
