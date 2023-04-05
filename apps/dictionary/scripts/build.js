const StyleDictionaryPackage = require('style-dictionary');
const glob = require('glob');

const getStyleDictionaryBrandConfig = (brand) => (
	{
		"source": [`tokens/${brand.tokens}`],
		"platforms": {
			"css": {
				"transformGroup": "css",
				"buildPath": `build/css/brands/${brand.name}/`,
				"files": [{
					"destination": "_variables.css",
					"format": "css/variables"
				}]
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

	brands.forEach((brand) => {
		const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryBrandConfig(brand));

		StyleDictionary.buildPlatform('css');
	});
})();
