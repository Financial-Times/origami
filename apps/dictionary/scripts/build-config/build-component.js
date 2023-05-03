const StyleDictionaryPackage = require("style-dictionary");
const {brandClasses} = require('../formatters/css/brand-classes');
const {nameOrigamiPrivatePrefix} = require('../transforms/nameOrigamiPrefix');
const {registerTransforms} = require("@tokens-studio/sd-transforms");

const component = process.argv[2];
const componentPath = `../../components/${component}`

StyleDictionaryPackage.registerFormat({name: 'css/brand/classes', formatter: brandClasses});
StyleDictionaryPackage.registerTransform({
	name: 'name/origamiPrivatePrefix',
	type: 'name',
	transformer: nameOrigamiPrivatePrefix
});
registerTransforms(StyleDictionaryPackage);

const getComponentConfig = (brand) => ({
	"source": [
		`${brand.path}/**/*.json`
	],
	"include": [
		"tokens/color.json",
		"tokens/o-brand-*.json"
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
					"destination": `${componentPath}/src/css/${brand.name}/_variables.css`,
					"format": "css/brand/classes",
					"options": {
						"outputReferences": true,
						"classNames": [ `o-brand-${brand.name}`, `${component}`],
						"excludePrefix": ['color-base', 'usecase']
					}
				}
			]
		}
	}
});

//TODO: this is not ideal for supporting multi components, not all components support all brands. May need to glob to understand what directories exist.
const brands = [
	{name: 'core', path: `${componentPath}/tokens/core`},
	// {name: 'core-professional', path: `${componentPath}/tokens/core/professional`},
	// {name: 'internal', path: `${componentPath}/tokens/internal`},
	{name: 'whitelabel', path: `${componentPath}/tokens/whitelabel`},
]
brands.forEach((brand) => {
	const StyleDictionary = StyleDictionaryPackage.extend(getComponentConfig(brand));
	StyleDictionary.buildAllPlatforms();
});
