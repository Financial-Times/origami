'use strict';

const { getOrigamiJson } = require('./files');

/**
 * @throws {Error} - Throws an error if not in a component directory which follows v2 or higher of the Origami Component Specification.
 * @returns {undefined}
 */
module.exports = async () => {
	const origamiJson = await getOrigamiJson();
	if (origamiJson && origamiJson.origamiVersion === 1) {
		throw new Error(
			'This version of Origami Build Tools does not support components ' +
			'which follow v1 of the Origami component specification. ' +
			'To work on this component install a previous version of the ' +
			'Origami Build Tools (v10). Alternatively, upgrade this ' +
			'component to follow the latest component recommendations: ' +
			'https://origami.ft.com/docs/components/code'
		);
	}
	if (!origamiJson || typeof origamiJson.origamiVersion !== 'string') {
		throw new Error(
			'Is this an Origami component? \n\n' +
			'Origami Build Tools may only be used to develop Origami ' +
			'components. It looks like this isn\'t an Origami component, ' +
			'or the component is missing a valid "origami.json". See the ' +
			'origami.json manifest documentation for more details: ' +
			'https://origami.ft.com/docs/manifests/origami-json/'
		);
	}
};
