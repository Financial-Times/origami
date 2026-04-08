import path from 'node:path';
import {toolingTransformers} from '../transformers.js';

/**
 * @typedef {import('./../../build.js')} Brand
 */

/**
 * Build a Style Dictionary Tooling config for a given brand.
 *
 * This particular config is used to generate tokens for use in Origami projects such as apps/website.
 *
 * @param {Brand} brand - brand to build config for.
 * @returns {Object}
 */
function toolingConfigForBrand(brand) {
	const parentBrand = brand.split('/').slice(-1);
	return {
		transformGroup: 'js',
		transforms: toolingTransformers,
		buildPath: path.join(
			process.cwd(),
			'../../libraries/o3-tooling-token/build/'
		),
		files: [
			{
				filter: token => {
					return token.path[1] === 'icon';
				},
				destination: 'icons/_variables.js',
				format: 'tooling/esm',
			},
			{
				filter: token => {
					return (
						token.path[1] !== 'icon' &&
						!token.filePath.includes(`/components/`) &&
						token.original.value !== '{DO-NOT-USE}' &&
						token.path[0] !== 'DO-NOT-USE'
					);
				},
				destination: `${brand}/_variables.js`,
				format: 'tooling/esm',
			},
		],
	};
}

export {toolingConfigForBrand};
