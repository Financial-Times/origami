const oCommentApi = require('o-comment-api');
const oCommentUtilities = require('o-comment-utilities');
const generateId = oCommentUtilities.generateId;

function getCamelCaseName (str) {
	const parts = str.split('-');
	let result = parts[0];

	for (let i = 1; i < parts.length; i++) {
		result += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
	}

	return result;
}

function getAttributeValue(valueRead) {
	if (valueRead === "true") {
		return true;
	} else if (valueRead === "false") {
		return false;
	} else {
		const intValue = parseInt(valueRead, 10);
		if (!isNaN(valueRead) && intValue) {
			return intValue;
		} else {
			return valueRead;
		}
	}
}

module.exports = function (config) {
	let el = config.context;

	if (!el) {
		el = document.body;
	} else if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}

	const instances = el.querySelectorAll('[data-o-component="'+ config.classNamespace +'"]');

	let elItem;
	let meetsReqs;
	const widgetsToInitialize = [];
	const articleIds = [];

	for (let i = 0; i < instances.length; i++) {
		elItem = instances[i];

		meetsReqs = !elItem.getAttribute('data-' + config.classNamespace + '-built');
		if (config.auto) {
			meetsReqs = meetsReqs && elItem.getAttribute('data-' + config.classNamespace + '-auto-init') !== "false";
		}

		if (meetsReqs) {
			if (!elItem.id) {
				// generate an ID
				elItem.id = config.classNamespace + '--' + generateId();
			}

			// prevent rebuilding it again
			elItem.setAttribute('data-' + config.classNamespace + '-built', "true");

			const widgetConfig = {};
			let match;
			let itemsInConfig;
			let currentLevel;
			let camelCaseConfigName;

			for (let j = 0; j < elItem.attributes.length; j++) {
				match = elItem.attributes[j].name.match(new RegExp('data-' + config.classNamespace + '-config-(.*)'));
				if (match && match.length) {
					itemsInConfig = match[1].split('--');
					currentLevel = widgetConfig;

					for (let k = 0; k < itemsInConfig.length; k++) {
						camelCaseConfigName = getCamelCaseName(itemsInConfig[k]);
						if (k === itemsInConfig.length - 1) {
							// last level
							currentLevel[camelCaseConfigName] = getAttributeValue(elItem.attributes[j].value);
						} else {
							// there's one more level
							if (!currentLevel[camelCaseConfigName]) {
								currentLevel[camelCaseConfigName] = {};
								currentLevel = currentLevel[camelCaseConfigName];
							}
						}
					}
				}
			}

			const articleId = widgetConfig.articleId || widgetConfig.articleid;

			if (articleId && articleIds.indexOf(articleId) === -1) {
				articleIds.push(articleId);
			}

			widgetsToInitialize.push({
				el: elItem,
				widgetConfig: widgetConfig
			});
		}
	}

	if (articleIds && articleIds.length) {
		oCommentApi.api.getCommentCounts(articleIds, function (err, counts) {
			if (err || !counts) {
				return;
			}

			widgetsToInitialize.forEach(item => {
				const articleId = item.widgetConfig.articleId || item.widgetConfig.articleid || null;

				if (counts[articleId] >= 0) {
					item.widgetConfig.count = counts[articleId];
				}

				/* eslint-disable */ // Constructor name should start with uppercase, but in this case the constructor is a variable
				const widget = new config.module(item.el, item.widgetConfig);
				/* eslint-enable */

				document.body.dispatchEvent(new CustomEvent(config.eventNamespace + '.ready', {
					detail: {
						id: item.id, // @deprecated
						instance: widget
					},
					bubble: true
				}));
			});
		});
	}
};
