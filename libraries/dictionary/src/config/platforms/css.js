import {sharedTransformers} from '../transformers.js';
import components from '../components.js';
import {outputReferencesTransformed} from 'style-dictionary/utils';

function cssConfigForBrand(brand) {
	const parentBrand = brand.split('/').slice(-1);
	return {
		transformGroup: 'css',
		transforms: [
			...sharedTransformers,
			'value/figma-shadow-shorthand',
			'value/transformSVG',
		],
		buildPath: `css/`,
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
						!token.filePath.includes(`/components/`) &&
						token.path[1] !== 'icons'
					);
				},
				destination: `${parentBrand}/foundation.css`,
				format: 'css/brand/classes',
				options: {
					outputReferences: outputReferencesTransformed,
					parentSelector: `[data-o3-brand="${parentBrand}"]`,
				},
			},
			{
				filter: token => {
					return token.path[1] === 'icons';
				},
				destination: `icons.css`,
				format: 'css/variables',
				options: {
					outputReferences: outputReferencesTransformed,
				},
			},
			...Object.entries(components).map(
				([componentName, placeTokensAtRoot]) => {
					const parentSelector = placeTokensAtRoot
						? `[data-o3-brand="${parentBrand}"]`
						: `[data-o3-brand="${parentBrand}"] .${componentName}`;
					return {
						filter: token => {
							return token.name.match(`^_?(${componentName})`);
						},
						destination: `${parentBrand}/${componentName}.css`,
						format: 'css/brand/classes',
						options: {
							outputReferences: outputReferencesTransformed,
							parentSelector,
						},
					};
				}
			),
		],
	};
}

export {cssConfigForBrand};
