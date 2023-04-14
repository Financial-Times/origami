const StyleDictionaryPackage = require('style-dictionary');
const glob = require('glob');
const {registerTransforms} = require("@tokens-studio/sd-transforms");
const { brandClasses } = require('./formatters/css/brand-classes')

StyleDictionaryPackage.registerFormat({name: 'css/brandClasses', formatter: brandClasses});

const getStyleDictionaryBrandConfig = (brand) => (
	{
		"source": [`tokens/${brand.tokens}`],
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
					'name/cti/kebab'
				],
				"buildPath": `build/css/brands/${brand.name}/`,
				"files": [{
					"destination": "_variables.css",
					"format": "css/brandClasses"
				}],
			}
		}
	}
)
const getBrands = async () => {
	let brandFiles;
	try {
		brandFiles = await glob('tokens/brand-*.json', {nodir: true});
	} catch (err) {
		throw new Error(`Error reading file system: ${err}`);
	}
	return brandFiles.map(file => {
		const [fileNameExcludingPrefix, extension] = file.split('brand-')[1].split('.');
		return {
			name: fileNameExcludingPrefix,
			tokens: `brand-${fileNameExcludingPrefix}.${extension}`
		};
	});
}

(async () => {
	const brands = await getBrands();
	registerTransforms(StyleDictionaryPackage);

	brands.forEach((brand) => {
		const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryBrandConfig(brand));

		StyleDictionary.buildPlatform('css');
	});
})();
