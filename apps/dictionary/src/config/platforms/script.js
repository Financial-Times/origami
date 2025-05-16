import path from 'node:path';
import {webTransformers} from '../transformers.js';

function jsConfigForBrand(brand) {
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
						!token.filePath.includes(`/components/`)
					);
				},
				destination: `o3-foundation/src/js/tokens/${subBrand}.js`,
				format: 'javascript/esm',
				options: {
					flat: true
				},
			}
		],
	};
}

export {jsConfigForBrand};
