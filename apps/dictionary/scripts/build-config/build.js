const StyleDictionaryPackage = require("style-dictionary")
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

StyleDictionaryPackage.registerFilter({
	name: "filter/doNotUse",
	matcher: token =>
		token.original.value !== "{DO-NOT-USE}" && token.path[0] !== "DO-NOT-USE",
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
					filter: "filter/doNotUse",
					destination: "_variables.css",
					format: "css/brand/classes",
					options: {
						outputReferences: true,
						classNames: [`o-brand-${brand.name}`],
					},
				},
			],
		},
	},
})
const getBrands = () => {
	return themes.map(theme => {
		const brandName =
			theme.group != theme.name ? `${theme.group}/${theme.name}` : theme.group
		return {
			name: brandName,
			sources: Object.keys(theme.selectedTokenSets).map(
				tokenSet => `tokens/${tokenSet}.json`
			),
		}
	})
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
