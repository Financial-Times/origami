import StyleDictionaryPackage from "style-dictionary"
import {brandClasses} from "../formatters/css/brand-classes.js"
import {nameOrigamiPrivatePrefix} from "../transforms/nameOrigamiPrefix.js"
import {registerTransforms} from "@tokens-studio/sd-transforms"
import {tokenStudioThemes, ConfigBuilder} from "./utils.js"

StyleDictionaryPackage.registerFormat({
	name: "css/brand/classes",
	formatter: brandClasses,
})
StyleDictionaryPackage.registerTransform({
	name: "name/origamiPrivatePrefix",
	type: "name",
	transformer: nameOrigamiPrivatePrefix,
})
StyleDictionaryPackage.registerFilter({
	name: "filter/doNotUse",
	matcher: token =>
		token.original.value !== "{DO-NOT-USE}" && token.path[0] !== "DO-NOT-USE",
})

function buildComponentTokens() {
	const componentName = process.argv[2]
	// const sources = [`tokens/components/${componentName}/tokens.json`]
	const includeTokens = ["tokens/core/base/color.json", "tokens/utility-tokens.json"]

	const transformers = [
		"ts/descriptionToComment",
		"ts/typography/css/shorthand",
		"ts/border/css/shorthand",
		"ts/shadow/css/shorthand",
		"ts/color/css/hexrgba",
		"ts/color/modifiers",
		"name/origamiPrivatePrefix",
	]

	const filesConfig = [
		{
			filter: "filter/doNotUse",
			format: "css/brand/classes",
			options: {
				outputReferences: true,
				includePrefix: [componentName],
			},
		},
	]

	tokenStudioThemes
		.forEach(theme => {
			const brandName =
				theme.group != theme.name ? `${theme.group}/${theme.name}` : theme.group
			includeTokens.push(`tokens/${brandName}/**.json`)
			const sources = [`tokens/${brandName}/components/${componentName}.json`]
			const exportPath = `../../components/${componentName}/src/css/${brandName}/${componentName}/_variables.css`
			filesConfig[0].destination = exportPath
			filesConfig[0].options.classNames = [
				`o-brand-${brandName.split("/").slice(-1)}`,
				`${componentName}`,
			]

			new ConfigBuilder(StyleDictionaryPackage)
				.setSources(sources)
				.setIncludeFiles(includeTokens)
				.setTransforms(transformers)
				.setBuildPath(`./`)
				.setFilesConfig(filesConfig)
				.buildDictionary()
		})
}
registerTransforms(StyleDictionaryPackage)
buildComponentTokens()
