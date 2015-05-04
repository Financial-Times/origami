"use strict";

var oCommentUtilities = require('o-comment-utilities'),
	envConfig = require('./config.js'),
	globalEvents = require('./globalEvents');

/**
 * Load Livefyre's core Javascript library
 */
exports.loadLivefyreCore = (function () {
	var status = {
		loaded: false,
		status: '',
		inProgress: false,
		event: new oCommentUtilities.Events()
	};

	return function (callback) {
		if (typeof callback !== 'function') {
			callback = function () {};
		}

		if (status.loaded === true) {
			if (status.status === 'success') {
				callback();
			} else {
				callback(status.error);
			}
		} else {
			status.event.on('done', function () {
				if (status.status === 'success') {
					callback();
				} else {
					callback(status.error);
				}
			});

			if (!status.inProgress) {
				status.inProgress = true;

				oCommentUtilities.scriptLoader(
					{
						url: envConfig.get().livefyre.resourceDomainBase + envConfig.get().resourceUrls.livefyreJs,
						cache: true
					},
					function (err) {
						if (err) {
							status.loaded = true;
							status.status = 'error';
							status.error = err;
							status.event.trigger('done');

							globalEvents.trigger('error.livefyreJs', status.error);

							return;
						}

						if (typeof Livefyre === 'undefined') {
							status.loaded = true;
							status.status = 'error';
							status.error = new Error("Script not loaded.");
							status.event.trigger('done');

							globalEvents.trigger('error.livefyreJs', status.error);

							return;
						}

						status.loaded = true;
						status.status = 'success';
						status.event.trigger('done');
					}
				);
			}
		}
	};
})();
