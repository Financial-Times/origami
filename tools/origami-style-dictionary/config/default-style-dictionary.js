import StyleDictionary from 'style-dictionary';
import fsExtra from 'fs-extra';
import path from 'node:path';
import {files} from 'origami-tools-helpers';

const buildDictionaryForBrands = async (brands) => {
	const componentName = await files.getComponentName();

	for (const brand of brands) {
		await buildDictionaryForBrand(brand);
	}

	await fsExtra.writeFile('src/scss/_brand.scss', `
		@use '@financial-times/o-brand/main';
		${brands.map(brand => `
		@use '../dist-tokens/${brand}/tokens' as ${brand};
		`).join('\n')}

		$_${componentName}-branded-tokens: ();

		${brands.map(brand => `
		@if oBrandGetCurrentBrandNew() == ${brand} {
			$_${componentName}-branded-tokens: ${brand}.$${componentName}-tokens !global;
		}
		`).join('')}
	`);
};

const buildDictionaryForBrand = async (brand) => {
	const componentName = await files.getComponentName();

	const buildPath = `./src/dist-tokens/${brand}/`
	const tokenPath = `./tokens/`

	console.log(`Removing previous build...`);
	fsExtra.removeSync(buildPath);

	console.log(`☀️ Building brand:${brand}, mode:light...`);

	const storybook = StyleDictionary.extend({

		transform: {
			'origami/o-brand': {
				type: `attribute`,
				transformer: token => {
					token.path.unshift(brand);
					return token;
				}
			},
			'origami/component-name-prefix': {
				type: `name`,
				transformer: token => {
					return `${componentName}-${token.name}`
				}
			},
			'origami/o-colors-name': {
				type: `name`,
				matcher: token =>
				componentName === 'o-colors' && token.attributes?.category === 'color',
				transformer: token => {
					return token.name
					.replace('o-colors-color-palette', 'o-colors')
					.replace('o-colors-color-usecase', 'o-colors')
				}
			}
		},

		source: [
			path.join(tokenPath, `/${brand}/**/!(*.dark).json`)
		],

		platforms: {
			css: {
				transforms: [
					'attribute/cti',
					'name/cti/kebab',
					'time/seconds',
					'content/icon',
					'size/rem',
					'color/css',
					'origami/component-name-prefix',
					'origami/o-colors-name'
				],
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
				transforms: [
					'attribute/cti',
					'name/cti/kebab',
					'time/seconds',
					'content/icon',
					'size/rem',
					'color/css',
					'color/css',
					'origami/component-name-prefix',
					'origami/o-colors-name',
					'origami/o-brand'
				],
				buildPath,
				files: [
					{
						destination: `tokens.scss`,
						format: `scss/map-deep`,
						// @ts-ignore
						mapName: `${componentName}-tokens`,
						options: {
							outputReferences: true,
							themeable: false
						}
					}
				]
			},

			js: {
				transformGroup: 'web',
				buildPath,
				files: [{
					destination: `tokens.json`,
					format: `json/nested`
				}]
			}

		}
	});

	storybook.buildAllPlatforms();
}

export {
	buildDictionaryForBrands
};
