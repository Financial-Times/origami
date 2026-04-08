import path from 'node:path';
import {webTransformers} from '../transformers.js';

/**
 * @typedef {import('./../../build.js')} Brand
 */

/**
 * Build a Style Dictionary SASS config for a given brand
 * @param {Brand} brand - brand to build config for.
 * @returns {Object}
 */
function sassConfigForBrand(brand) {
	const parentBrand = brand.split('/').slice(-1);
	return {
		transformGroup: 'scss',
		transforms: [
			...webTransformers,
			'value/figma-shadow-shorthand',
			'value/transformSVG',
		],
		buildPath: path.join(process.cwd(), '../../components/'),
		files: [
			{
				destination: `o-private-foundation/src/scss/tokens/${parentBrand}.scss`,
				format: 'origami/scss/map-flat',
				options: {
					outputReferences: false,
				},
			},
		],
	};
}

export {sassConfigForBrand};
