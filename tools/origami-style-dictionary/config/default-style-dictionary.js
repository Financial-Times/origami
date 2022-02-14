import StyleDictionary from 'style-dictionary';
import fsExtra from 'fs-extra';
import path from 'node:path';

const buildDictionaryForBrand = (brand) => {

	const buildPath = `./src/dist-tokens/${brand}/`
	const tokenPath = `./tokens/`

	console.log(`Removing previous build...`);
	fsExtra.removeSync(buildPath);

	console.log(`☀️ Building brand:${brand}, mode:light...`);

	const storybook = StyleDictionary.extend({
		source: [
			path.join(tokenPath, `/${brand}/**/!(*.dark).json`)
		],

		platforms: {
			css: {
				transformGroup: 'css',
				buildPath,
				files: [{
					destination: `variables.css`,
					format: `css/variables`,
					filter: (token) => token.attributes.category !== `image`,
					options: {
						outputReferences: true
					}
				}]
			},

			sass: {
				transformGroup: 'scss',
				buildPath,
				files: [
					{
						destination: `tokens.scss`,
						format: `scss/map-deep`,
						// @ts-ignore
						mapName: `_tokens`,
						options: {
							outputReferences: true
						}
					}
				]
			},

			js: {
				transformGroup: 'web',
				buildPath,
				files: [{
					destination: `tokens.json`,
					format: `json/flat`
				}]
			}

		}
	});

	storybook.buildAllPlatforms();
}

export {
	buildDictionaryForBrand
};
