const envConfig = require('./config.js');
const oCommentUtilities = require('o-comment-utilities');
const oCommentApi = require('o-comment-api');

const Widget = function (rootEl, config) {
	let widgetEl;
	let commentCount;

	try {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) { // could throw exception in IE
			rootEl = document.querySelector(rootEl);
		}
	} catch (e) {
		let el;
		if (typeof rootEl === 'string') {
			el = document.querySelector(rootEl);
		}

		if (el) {
			rootEl = el;
		} else {
			rootEl = document.body;
		}
	}

	rootEl.setAttribute('data-o-comment-count-js', '');

	widgetEl = rootEl;


	/**
	 * Validation of the initial configuration object.
	 */
	if (!config) {
		throw new Error("No configuration is provided.");
	}

	if (!config.articleId) {
		if (!config.articleid) {
			throw new Error("Article ID is missing.");
		} else {
			config.articleId = config.articleid;
		}
	}

	const template = config.template || envConfig.get('template');
	const ariaLabelTemplate = config.ariaLabelTemplate || envConfig.get('ariaLabelTemplate');

	if (config.count >= 0) {
		commentCount = config.count;
	}

	function replacePlaceholders (templateString, count) {
		return templateString.replace('{count}', count).replace('{plural}', (count > 1 ? 's' : ''));
	}

	function render () {
		getCommentCount(function (err, count) {
			if (err) {
				return;
			}

			if (count === 0 && config.hideIfZero === true) {
				widgetEl.style.visibility = 'hidden';
			} else {
				widgetEl.style.visibility = 'visible';
				if (template) {
					widgetEl.innerHTML = replacePlaceholders(template, count);
				}

				if (ariaLabelTemplate) {
					widgetEl.setAttribute('aria-label', replacePlaceholders(ariaLabelTemplate, count));
					widgetEl.setAttribute('title', replacePlaceholders(ariaLabelTemplate, count));
				}
			}
		});
	}

	function getCommentCount (callback) {
		if (commentCount >= 0) {
			callback(null, commentCount);
		} else {
			oCommentApi.api.getCommentCount(config.articleId, function (err, count) {
				if (err) {
					callback(err);

					oCommentUtilities.logger.error('Error fetching the comment count', err);
					return;
				}

				commentCount = count;
				callback(null, commentCount);
			});
		}
	}

	function init () {
		render();
	}

	if (config.autoInit !== false) {
		init();
	}

	return {
		init: init,
		getCommentCount: getCommentCount
	};
};

module.exports = Widget;
