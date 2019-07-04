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

function getAttributeValue (valueRead) {
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
	let item;
	let meetsReqs;
	const instances = config.context;
	const widgets = [];

	for (let i = 0; i < instances.length; i++) {
		item = instances[i];

		meetsReqs = !item.getAttribute('data-' + config.classNamespace + '-built');
		if (config.auto) {
			meetsReqs = meetsReqs && item.getAttribute('data-' + config.classNamespace + '-auto-init') !== "false";
		}

		if (meetsReqs) {
			if (!item.id) {
				// generate an ID
				item.id = config.classNamespace + '--' + generateId();
			}

			// prevent rebuilding it again
			item.setAttribute('data-' + config.classNamespace + '-built', "true");

			const widgetConfig = {};
			let match;
			let itemsInConfig;
			let currentLevel;
			let camelCaseConfigName;

			for (let j = 0; j < item.attributes.length; j++) {
				match = item.attributes[j].name.match(new RegExp('data-' + config.classNamespace + '-config-(.*)'));
				if (match && match.length) {
					itemsInConfig = match[1].split('--');
					currentLevel = widgetConfig;

					for (let k = 0; k < itemsInConfig.length; k++) {
						camelCaseConfigName = getCamelCaseName(itemsInConfig[k]);
						if (k === itemsInConfig.length - 1) {
							// last level
							currentLevel[camelCaseConfigName] = getAttributeValue(item.attributes[j].value);
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

			/* eslint-disable */ // Constructor name should start with uppercase, but in this case the constructor is a variable
			const widget = new config.module(item, widgetConfig);
			/* eslint-enable */

			document.body.dispatchEvent(new CustomEvent(config.eventNamespace + '.ready', {
				detail: {
					id: item.id,
					instance: widget
				},
				bubble: true
			}));

			widgets.push(widget);
		}
	}

	return widgets;
};
