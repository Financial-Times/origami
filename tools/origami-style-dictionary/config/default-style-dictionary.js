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
		@import '@financial-times/o-brand/main';
		${brands.map(brand => `
		@import '../dist-tokens/${brand}/backward-compatible-tokens';
		`).join('\n')}

		$_${componentName}-branded-tokens: ();

		${brands.map(brand => `
		@if oBrandGetCurrentBrandNew() == ${brand} {
			$_${componentName}-branded-tokens: $_o-colors-${brand}-tokens !global;
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
			'origami/o-brand-compatibility': {
				type: `name`,
				transformer: token => {
					return `${brand}-${token.name}`
				}
			},
			'origami/private-sass': {
				type: `name`,
				transformer: token => {
					return `_${token.name}`
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
					.replace('color-palette-', '')
					.replace('color-usecase-', '')
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
					'color/css'
				],
				buildPath,
				files: [
					{
						destination: `tokens.scss`,
						format: `scss/map-deep`,
						// @ts-ignore
						mapName: `tokens`,
						options: {
							outputReferences: true,
							themeable: false
						}
					}
				]
			},

			sassBackwardCompatibility: {
				transforms: [
					'attribute/cti',
					'name/cti/kebab',
					'time/seconds',
					'content/icon',
					'size/rem',
					'color/css',
					'color/css',
					'origami/o-brand-compatibility',
					'origami/component-name-prefix',
					'origami/o-colors-name',
					'origami/private-sass'
				],
				buildPath,
				files: [
					{
						destination: `backward-compatible-tokens.scss`,
						format: `scss/map-deep`,
						// @ts-ignore
						mapName: `_${componentName}-${brand}-tokens`,
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
