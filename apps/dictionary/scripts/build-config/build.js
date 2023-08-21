const StyleDictionaryPackage = require("style-dictionary")
const glob = require("glob")
const {registerTransforms} = require("@tokens-studio/sd-transforms")
const {brandClasses} = require("../formatters/css/brand-classes")
const {transformSVG} = require("../transforms/transformSVG")

const themes = require("../../tokens/$themes.json")

StyleDictionaryPackage.registerFormat({
	name: "css/brand/classes",
	formatter: brandClasses,
})

StyleDictionaryPackage.registerTransform({
	name: "value/transformSVG",
	type: "value",
	transformer: transformSVG,
	matcher: token => token.type === "asset",
	transitive: true,
})

const getStyleDictionaryBrandConfig = brand => ({
	source: brand.sources,
	platforms: {
		css: {
			transformGroup: "css",
			transforms: [
				"ts/descriptionToComment",
				"ts/typography/css/shorthand",
				"ts/border/css/shorthand",
				"ts/shadow/css/shorthand",
				"ts/color/css/hexrgba",
				"ts/color/modifiers",
				"name/cti/kebab",
			],
			buildPath: `build/css/usecase/${brand.name}/`,
			files: [
				{
					destination: "_variables.css",
					format: "css/brand/classes",
					options: {
						outputReferences: true,
						classNames: [`o-brand-${brand.name}`],
						excludePrefix: ["o-color-base"],
					},
				},
			],
		},
	},
})
const getBrands = () => {
	return themes.map(theme => ({
		name: theme.name,
		sources: Object.keys(theme.selectedTokenSets).map(
			tokenSet => `tokens/${tokenSet}.json`
		),
	}))
}

;(async () => {
	const brands = getBrands()
	registerTransforms(StyleDictionaryPackage)
	brands.forEach(brand => {
		const StyleDictionary = StyleDictionaryPackage.extend(
			getStyleDictionaryBrandConfig(brand)
		)
		StyleDictionary.buildPlatform("css")
	})

	const StyleDictionaryIcons = StyleDictionaryPackage.extend({
		source: ["tokens/icons/icons.json"],
		platforms: {
			css: {
				transformGroup: "css",
				transforms: [
					"ts/descriptionToComment",
					"name/cti/kebab",
					"value/transformSVG",
				],
				buildPath: `build/css/icons/`,
				files: [
					{
						destination: "_variables.css",
						format: "css/variables",
						options: {
							outputReferences: true,
						},
					},
				],
			},
		},
	})

	StyleDictionaryIcons.buildPlatform("css")
})()
