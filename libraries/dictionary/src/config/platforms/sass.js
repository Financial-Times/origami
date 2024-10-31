import {sharedTransformers} from '../transformers.js';

function sassConfigForBrand(brand) {
	const parentBrand = brand.split('/').slice(-1);
	return {
		transformGroup: 'scss',
		transforms: [
			...sharedTransformers,
			'value/figma-shadow-shorthand',
			'value/transformSVG',
		],
		buildPath: `scss/`,
		files: [
			{
				destination: `${parentBrand}.scss`,
				format: 'scss/map-flat',
				options: {
					outputReferences: false
				},
			}
		],
	};
}

export {sassConfigForBrand};
