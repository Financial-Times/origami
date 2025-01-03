import path from 'node:path';
import {sharedTransformers} from '../transformers.js';

function toolingConfigForBrand(brand) {
	const parentBrand = brand.split('/').slice(-1);
	return {
		transformGroup: 'js',
		transforms: [...sharedTransformers, 'Origami/tintGroup'],
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
