import {sharedTransformers} from '../transformers.js';

function toolingConfigForBrand(brand) {
	return {
		transformGroup: 'js',
		transforms: [...sharedTransformers, 'Origami/tintGroup'],
		buildPath: `js/${brand.split('/').slice(-1)}/`,
		files: [
			{
				filter: token => {
					return !(
						token.original.value === '{DO-NOT-USE}' ||
						token.path[0] === 'DO-NOT-USE'
					);
				},
				destination: 'tooling.js',
				format: 'tooling/esm',
			},
		],
	};
}

export {toolingConfigForBrand};
