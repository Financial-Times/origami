const StyleDictionaryPackage = require("style-dictionary");
const {brandClasses} = require('../formatters/css/brand-classes');
const {nameOrigamiPrivatePrefix} = require('../transforms/nameOrigamiPrefix');
const {registerTransforms} = require("@tokens-studio/sd-transforms");
const glob = require('glob');

const component = process.argv[2];

StyleDictionaryPackage.registerFormat({name: 'css/brand/classes', formatter: brandClasses});
StyleDictionaryPackage.registerTransform({
	name: 'name/origamiPrivatePrefix',
	type: 'name',
	transformer: nameOrigamiPrivatePrefix
});
registerTransforms(StyleDictionaryPackage);

const getComponentConfig = (brand) => ({
	"source": brand.sources,
	"include": [
		"tokens/base/color.json",
		"tokens/use-case/o-brand-*.json"
	],
	"platforms": {
		"css": {
			"transformGroup": "css",
			"transforms": [
				"ts/descriptionToComment",
				"ts/typography/css/shorthand",
				"ts/border/css/shorthand",
				"ts/shadow/css/shorthand",
				"ts/color/css/hexrgba",
				"ts/color/modifiers",
				"name/origamiPrivatePrefix",
			],
			"buildPath": "./",
			"files": [
				{
					"destination": `${brand.exportPath}/_variables.css`,
					"format": "css/brand/classes",
					"options": {
						"outputReferences": true,
						"classNames": [`o-brand-${brand.name}`, `${component}`],
						"excludePrefix": ['color-base', 'usecase']
					}
				}
			]
		}
	}
});

const tokenPathsToTreeObject = (tokenPaths) => {
	const tree = {};
	tokenPaths.forEach((tokenPath) => {
		const tokenPathArray = tokenPath.split('/');
		const componentName = tokenPathArray[tokenPathArray.length - 3];
		const brandName = tokenPathArray[tokenPathArray.length - 2];

		if (!tree[componentName]) {
			tree[componentName] = {};
		}
		if (!tree[componentName][brandName]) {
			tree[componentName][brandName] = {
				name: brandName,
				sources: [tokenPath],
				exportPath: `../../components/${componentName}/src/css/${brandName}`
			};
		} else {
			tree[componentName][brandName].sources.push(tokenPath);
		}
	});
	return tree;
}

const getComponentBrands = async () => {
	let componentTokenPaths;
	try {
		componentTokenPaths = await glob(`./tokens/components/**/*.json`, {nodir: true});
	} catch (err) {
		throw new Error(`Error reading file system: ${err}`);
	}

	return tokenPathsToTreeObject(componentTokenPaths);
};
(async () => {
	const components = await getComponentBrands();
	Object.entries(components).forEach(([_, component]) => {
		Object.entries(component).forEach(([_, brand]) => {
			const componentConfig = getComponentConfig(brand);
			const StyleDictionary = StyleDictionaryPackage.extend(componentConfig);
			StyleDictionary.buildAllPlatforms();
		})
	});
})()

