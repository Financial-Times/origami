const envConfig = require('./envConfig');
const oCommentUtilities = require('o-comment-utilities');
const oCommentApi = require('o-comment-api');

const Widget = function (rootEl, config) {
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

	let commentCount;
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
				rootEl.style.visibility = 'hidden';
			} else {
				rootEl.style.visibility = 'visible';
				if (template) {
					rootEl.innerHTML = replacePlaceholders(template, count);
				}

				if (ariaLabelTemplate) {
					rootEl.setAttribute('aria-label', replacePlaceholders(ariaLabelTemplate, count));
					rootEl.setAttribute('title', replacePlaceholders(ariaLabelTemplate, count));
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
