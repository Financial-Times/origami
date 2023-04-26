const StyleDictionaryPackage = require('style-dictionary');
const glob = require('glob');
const {registerTransforms} = require("@tokens-studio/sd-transforms");
const {brandClasses} = require('./formatters/css/brand-classes');
const {nameOrigamiPrefix} = require('./transforms/nameOrigamiPrefix');

StyleDictionaryPackage.registerFormat({name: 'css/brand/classes', formatter: brandClasses});
StyleDictionaryPackage.registerTransform({name: 'name/origamiPrefix', type: 'name', transformer: nameOrigamiPrefix, transitive: true})

const getStyleDictionaryBrandConfig = (brand) => (
	{
		"source": [`tokens/${brand.tokens}`],
		"include": ['tokens/color.json'],
		"platforms": {
			"css": {
				"transformGroup": "css",
				"transforms": [
					'ts/descriptionToComment',
					'ts/typography/css/shorthand',
					'ts/border/css/shorthand',
					'ts/shadow/css/shorthand',
					'ts/color/css/hexrgba',
					'ts/color/modifiers',
					'name/origamiPrefix',
					'name/cti/kebab',
				],
				"buildPath": `build/css/brands/${brand.name}/`,
				"files": [{
					"destination": "_variables.css",
					"format": "css/brand/classes",
					"options": {
						"outputReferences": true,
						"className": `o-brand-${brand.name}`,
						"cssVarPrefix": 'o-'
					}
				}],
			}
		}
	}
)
const getBrands = async () => {
	let brandFiles;
	try {
		brandFiles = await glob('tokens/o-brand-*.json', {nodir: true});
	} catch (err) {
		throw new Error(`Error reading file system: ${err}`);
	}
	return brandFiles.map(file => {
		const [fileNameExcludingPrefix, extension] = file.split('brand-')[1].split('.');
		return {
			name: fileNameExcludingPrefix,
			tokens: `o-brand-${fileNameExcludingPrefix}.${extension}`
		};
	});
}

(async () => {
	const brands = await getBrands();
	registerTransforms(StyleDictionaryPackage);

	brands.forEach((brand) => {
		const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryBrandConfig(brand))
		StyleDictionary.buildPlatform('css');
	});

	const StyleDictionaryPallette = StyleDictionaryPackage.extend({
		"source": ['tokens/color.json'],
		"platforms": {
			"css": {
				"transformGroup": "css",
				"transforms": [
					'ts/descriptionToComment',
					'ts/typography/css/shorthand',
					'ts/border/css/shorthand',
					'ts/shadow/css/shorthand',
					'ts/color/css/hexrgba',
					'ts/color/modifiers',
					'name/origamiPrefix',
					'name/cti/kebab',
				],
				"buildPath": `build/css/pallette/`,
				"files": [{
					"destination": "_variables.css",
					"format": "css/variables",
					"options": {
						"outputReferences": true
					}
				}],
			}
		}
	});

	StyleDictionaryPallette.buildPlatform('css');
})();
