const oCommentUtilities = require('o-comment-utilities');
const globalEvents = require('./globalEvents');

/**
 * Tracks a comment post.
 * @param  {number} siteId Livefyre site ID.
 * @param  {number} parent Optional. Parent ID of the comment to which a reply was made.
 * @return {undefined}
 */
exports.trackPost = function (siteId, parent) {
	if (typeof siteId === "number") {
		globalEvents.trigger('event', 'oTracking', {
			category: 'comment',
			action: 'post',
			site_id: siteId,
			parent: parent
		});
		oCommentUtilities.logger.debug('tracking - post', siteId, parent);
	}
};

/**
 * Tracks a comment like.
 * @param  {number} siteId Livefyre site ID.
 * @return {undefined}
 */
exports.trackLike = function (siteId) {
	if (typeof siteId === "number") {
		globalEvents.trigger('event', 'oTracking', {
			category: 'comment',
			action: 'like',
			site_id: siteId
		});
		oCommentUtilities.logger.debug('tracking - like', siteId);
	}
};

/**
 * Tracks sharing a comment to the social media.
 * @param  {number} siteId Livefyre site ID.
 * @param  {string} platform e.g. facebook, twitter
 * @return {undefined}
 */
exports.trackShare = function (siteId, platform) {
	if (typeof siteId === "number" && typeof platform === "string") {
		globalEvents.trigger('event', 'oTracking', {
			category: 'comment',
			action: 'share',
			site_id: siteId,
			platform: platform
		});
		oCommentUtilities.logger.debug('tracking - share', siteId, platform);
	}
};

/**
 * Tracks when a social media user is mentioned.
 * @param  {number} siteId Livefyre site ID.
 * @param  {string} platform e.g. facebook, twitter
 * @return {undefined}
 */
exports.trackMention = function (siteId, platform) {
	if (typeof siteId === "number" && typeof platform === "string") {
		globalEvents.trigger('event', 'oTracking', {
			category: 'comment',
			action: 'mention',
			site_id: siteId,
			platform: platform
		});
		oCommentUtilities.logger.debug('tracking - mention', siteId, platform);
	}
};



/**
 * Tracks when a user subscribes for email alert
 */
const subscribeTermsTranslate = {
	"emailcomments": "notifyComments",
	"emailreplies": "notifyReplies",
	"emaillikes": "notifyRecommends",
	"emailautofollow": "autoFollow"
};
exports.trackSubscribeToEmailAlert = function (subscribeList) {
	const eventData = {
		category: 'comment',
		action: 'follow'
	};

	let matching;
	for (let i = 0; i < subscribeList.length; i++) {
		matching = subscribeTermsTranslate[subscribeList[i]];
		if (matching) {
			eventData[matching] = true;
		}
	}

	globalEvents.trigger('event', 'oTracking', eventData);
	oCommentUtilities.logger.debug('tracking - subscribe', "follow=true&type=comment", subscribeList);
};

/**
 * Tracks when a user unsubscribes from the email alert.
 * @param {Array} unsubscribeList List of unsubscribes
 * @return {undefined}
 */
exports.trackUnsubscribeFromEmailAlert = function (unsubscribeList) {
	const eventData = {
		category: 'comment',
		action: 'unfollow'
	};

	let matching;
	for (let i = 0; i < unsubscribeList.length; i++) {
		matching = subscribeTermsTranslate[unsubscribeList[i]];
		if (matching) {
			eventData[matching] = true;
		}
	}

	globalEvents.trigger('event', 'oTracking', eventData);
	oCommentUtilities.logger.debug('tracking - unsubscribe', "unfollow=true&type=comment", unsubscribeList);
};

/**
 * Tracks when SUDS is down.
 * @return {undefined}
 */
exports.trackSudsDown = function () {
	globalEvents.trigger('event', 'oTracking', {
		category: 'component',
		action: 'error',
		error: 'commentsSUDSCommunication'
	});
	oCommentUtilities.logger.debug('tracking - suds down');
};

/**
 * Tracks when Livefyre is down and the resources cannot be loaded.
 * @return {undefined}
 */
exports.trackLivefyreDown = function () {
	globalEvents.trigger('event', 'oTracking', {
		category: 'component',
		action: 'error',
		error: 'commentsLivefyreCommunication'
	});
	oCommentUtilities.logger.debug('tracking - livefyre down');
};

/**
 * Tracks when the widget is successfully loaded.
 * @return {undefined}
 */
exports.trackSuccessLoad = function () {
	globalEvents.trigger('event', 'oTracking', {
		category: 'component',
		action: 'load',
		component: 'comments'
	});
	oCommentUtilities.logger.debug('tracking - success load');
};
