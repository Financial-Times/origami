const StyleDictionaryPackage = require('style-dictionary');
const fs = require('fs').promises;

const getStyleDictionaryBrandConfig = (brand) => (
	{
		"source": [`tokens/brands/${brand.tokens}`],
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
	let brandDirectories;
	try {
		brandDirectories = await fs.readdir('./tokens/brands/', {withFileTypes: true});
	} catch (err) {
		throw new Error(`Error reading file system: ${err}`);
	}
	return brandDirectories.filter((dirent) => dirent.isDirectory()).map(directory => ({
		name: directory.name,
		tokens: directory.name + '/tokens.json'
	}));
}

(async () => {
	const brands = await getBrands();

	brands.forEach((brand) => {
		const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryBrandConfig(brand));

		StyleDictionary.buildPlatform('css');
	});
})();
