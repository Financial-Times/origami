import path from 'node:path';
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
		buildPath: path.join(process.cwd(), '../../components/'),
		files: [
			{
				destination: `o-private-foundation/src/scss/tokens/${parentBrand}.scss`,
				format: 'scss/map-flat',
				options: {
					outputReferences: false,
				},
			},
		],
	};
}

export {sassConfigForBrand};
