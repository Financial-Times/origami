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
	transformer: nameOrigamiPrivatePrefix,
	transitive: true
});
registerTransforms(StyleDictionaryPackage);

const config = {
	"source": [
		`${componentPath}/tokens/**/*.json`
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
				"name/cti/kebab"
			],
			"buildPath": "./",
			"files": [
				{
					"destination": `${componentPath}/_variables.css`,
					"format": "css/brand/classes",
					"options": {
						"outputReferences": true,
						"className": component,
						"excludePrefix": ['color-base', 'usecase']
					}
				}
			]
		}
	}
}

const StyleDictionary = StyleDictionaryPackage.extend(config);

StyleDictionary.buildAllPlatforms();
