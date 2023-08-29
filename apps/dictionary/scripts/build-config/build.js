import StyleDictionaryPackage from "style-dictionary"
import {registerTransforms} from "@tokens-studio/sd-transforms"
import {brandClasses} from "../formatters/css/brand-classes.js"
import {transformSVG} from "../transforms/transformSVG.js"
import {ConfigBuilder, tokenStudioThemes} from "./utils.js"


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

function getBrands() {
	return tokenStudioThemes.map(theme => {
		const brandName =
			theme.group != theme.name ? `${theme.group}/${theme.name}` : theme.group
		return {
			name: brandName,
			sources: Object.keys(theme.selectedTokenSets)
				.filter(tokenSet => !tokenSet.startsWith("components/"))
				.map(tokenSet => `tokens/${tokenSet}.json`),
		}
	})
}

function buildBrandTokens() {
	const brands = getBrands()

	const brandTransforms = [
		"ts/descriptionToComment",
		"ts/typography/css/shorthand",
		"ts/border/css/shorthand",
		"ts/shadow/css/shorthand",
		"ts/color/css/hexrgba",
		"ts/color/modifiers",
		"name/cti/kebab",
	]
	brands.forEach(brand => {
		const filesConfig = [
			{
				filter: "filter/doNotUse",
				destination: "_variables.css",
				format: "css/brand/classes",
				options: {
					outputReferences: true,
					classNames: [`o-brand-${brand.name.split("/").slice(-1)}`],
				},
			},
		]
		new ConfigBuilder(StyleDictionaryPackage)
			.setSources(brand.sources)
			.setTransforms(brandTransforms)
			.setBuildPath(`build/css/usecase/${brand.name}/`)
			.setFilesConfig(filesConfig)
			.buildDictionary()
	})
}
function buildIconTokens() {
	const iconTransformers = [
		"ts/descriptionToComment",
		"name/cti/kebab",
		"value/transformSVG",
	]
	const iconsFileConfig = [
		{
			destination: "_variables.css",
			format: "css/variables",
			options: {
				outputReferences: true,
			},
		},
	]

	new ConfigBuilder(StyleDictionaryPackage)
		.setSources(["tokens/icons/icons.json"])
		.setTransforms(iconTransformers)
		.setBuildPath("build/css/icons/")
		.setFilesConfig(iconsFileConfig)
		.buildDictionary()
}

registerTransforms(StyleDictionaryPackage)
buildBrandTokens()
buildIconTokens()
