/* eslint-disable no-console */
const missingDataMessage = 'Could not find layout information. ' +
	'You may need to include o-grid css. See the README (https://registry.origami.ft.com/components/o-grid/readme) ' +
	'for more information.';

/**
 * Grab the current layout.
 * CSS must be included so JavaScript can retrieve layout information.
 * See the README for more information.
 *
 * @returns {string} Layout name
 */
function getCurrentLayout() {
	return getGridProperties().layout;
}

/**
 * Grab grid properties
 *
 * @returns {object} layout names and gutter widths
 */
function getGridProperties() {
	const properties = getGridFromDoc('after');
	if (Object.keys(properties).length === 0) {
		console.warn(missingDataMessage);
	}
	return properties;
}

/**
 * Grab grid properties surfaced in html:after and html:before's content
 *
 * @param {string} position Whether to get all properties in :before, or current properties in :after
 * @returns {object} layout names and gutter widths
 */
function getGridFromDoc(position) {
	// Contained in a try/catch as it should not error if o-grid styles are not (deliberately or accidentally) loaded
	// e.g. o-tracking will always try to read this property, but the page is not obliged to use o-grid for layout
	try {
		let gridProperties = window.getComputedStyle(document.documentElement, ':' + position).getPropertyValue('content');
		// Firefox computes: "{\"foo\": \"bar\"}"
		// We want readable JSON: {"foo": "bar"}
		gridProperties = gridProperties.replace(/'/g, '').replace(/\\/g, '').replace(/^"/, '').replace(/"$/, '');
		return JSON.parse(gridProperties);
	} catch (e) {
		return {};
	}
}

const oPrivateGrid = {
	getCurrentLayout,
};

export {
	oPrivateGrid,
};

export default {
	oPrivateGrid,
};
