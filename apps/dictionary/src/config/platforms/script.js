import path from 'node:path';
import {webTransformers} from '../transformers.js';

/**
 * @typedef {import('./build.js')} Brand
 */

/**
 * Build a Style Dictionary JavaScript ESM config for a given brand
 * @param {Brand} brand - brand to build config for.
 * @returns {Object}
 */
function jsObjectConfigForBrand(brand) {
	const subBrand = brand.split('/').pop();
	return {
		transformGroup: 'js',
		transforms: webTransformers,
		buildPath: path.join(process.cwd(), '../../components/'),
		files: [
			{
				filter: token => {
					if (
						token.original.value === '{DO-NOT-USE}' ||
						token.path[0] === 'DO-NOT-USE'
					) {
						return false;
					}
					return (
						!token.filePath.includes(`/components/`) && token.path[1] !== 'icon'
					);
				},
				destination: `o3-foundation/src/js/tokens/${subBrand}.js`,
				format: 'javascript/esm',
				options: {
					flat: true
				},
			},
			{
				filter: token => {
					return token.path[1] === 'icon';
				},
				destination: `o3-foundation/src/js/tokens/icons.js`,
				format: 'javascript/esm',
				options: {
					flat: true
				},
			}
		],
	};
}

/**
 * Build a Style Dictionary JavaScript ES6 config for a given brand
 * @param {Brand} brand - brand to build config for.
 * @returns {Object}
 */
function jsNamedExportConfigForBrand(brand) {
	const subBrand = brand.split('/').pop();
	return {
		transformGroup: 'js',
		transforms: [...webTransformers, 'name/snake'],
		buildPath: path.join(process.cwd(), '../../components/'),
		files: [
			{
				filter: token => {
					if (
						token.original.value === '{DO-NOT-USE}' ||
						token.path[0] === 'DO-NOT-USE'
					) {
						return false;
					}
					return (
						!token.filePath.includes(`/components/`) && token.path[1] !== 'icon'
					);
				},
				destination: `o3-foundation/src/js/tokens/${subBrand}-named.js`,
				format: 'javascript/es6'
			},
			{
				filter: token => {
					return token.path[1] === 'icon';
				},
				destination: `o3-foundation/src/js/tokens/icons-named.js`,
				format: 'javascript/es6'
			}
		],
	};
}

export {jsObjectConfigForBrand, jsNamedExportConfigForBrand};
