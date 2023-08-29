import StyleDictionaryPackage from "style-dictionary"
import {brandClasses} from "../formatters/css/brand-classes.js"
import {nameOrigamiPrivatePrefix} from "../transforms/nameOrigamiPrefix.js"
import {registerTransforms} from "@tokens-studio/sd-transforms"
import {tokenStudioThemes, ConfigBuilder} from "./utils.js"
import glob from "glob"

const component = process.argv[2]

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
registerTransforms(StyleDictionaryPackage)

function buildComponentTokens() {
	const componentName = process.argv[2]
	const sources = [`tokens/components/${componentName}/tokens.json`]
	const includeTokens = ["tokens/base/color.json"]

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
				excludePrefix: ["color-base", "usecase"],
			},
		},
	]

	tokenStudioThemes
		.filter(
			theme =>
				theme.selectedTokenSets[`components/${componentName}/tokens`] ==
				"enabled"
		)
		.forEach(theme => {
			const brandName =
				theme.group != theme.name ? `${theme.group}/${theme.name}` : theme.group
			includeTokens.push(`tokens/core/${brandName}/variables.json`)
			const exportPath = `../../components/${componentName}/src/css/${brandName}/${componentName}/_variables.css`
			filesConfig[0].destination = exportPath
			filesConfig[0].options.classNames = [
				`o-brand-${brandName}`,
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

buildComponentTokens()

// const getComponentConfig = brand => ({
// 	source: brand.sources,
// 	include: [
// 		"tokens/base/color.json",
// 		`tokens/use-case/${brand}/variables.json`,
// 	],
// 	platforms: {
// 		css: {
// 			transformGroup: "css",
// 			transforms: [
// 				"ts/descriptionToComment",
// 				"ts/typography/css/shorthand",
// 				"ts/border/css/shorthand",
// 				"ts/shadow/css/shorthand",
// 				"ts/color/css/hexrgba",
// 				"ts/color/modifiers",
// 				"name/origamiPrivatePrefix",
// 			],
// 			buildPath: "./",
// 			files: [
// 				{
// 					filter: "filter/doNotUse",
// 					destination: `${brand.exportPath}/_variables.css`,
// 					format: "css/brand/classes",
// 					options: {
// 						outputReferences: true,
// 						classNames: [`o-brand-${brand.name}`, `${component}`],
// 						excludePrefix: ["color-base", "usecase"],
// 					},
// 				},
// 			],
// 		},
// 	},
// })

// const tokenPathsToTreeObject = tokenPaths => {
// 	const tree = {}
// 	tokenPaths.forEach(tokenPath => {
// 		console.log(`🚀 ~ tokenPath:`, tokenPath)
// 		const tokenPathArray = tokenPath.split("/")
// 		const componentName = tokenPathArray[tokenPathArray.length - 3]
// 		const brandName = tokenPathArray[tokenPathArray.length - 2]

// 		if (!tree[componentName]) {
// 			tree[componentName] = {}
// 		}
// 		if (!tree[componentName][brandName]) {
// 			tree[componentName][brandName] = {
// 				name: brandName,
// 				sources: [tokenPath],
// 				exportPath: `../../components/${componentName}/src/css/${brandName}`,
// 			}
// 		} else {
// 			tree[componentName][brandName].sources.push(tokenPath)
// 		}
// 	})
// 	console.log(`🚀 ~ tree:`)
// 	return tree
// }

// const getTokens = async (path, ignorePath) => {
// 	let tokenPaths
// 	try {
// 		tokenPaths = await glob(path, {
// 			nodir: true,
// 			ignore: ignorePath,
// 		})
// 	} catch (err) {
// 		throw new Error(`Error reading file system: ${err}`)
// 	}

// 	return tokenPathsToTreeObject(tokenPaths)
// }

// function buildStyleDictionary(components, configCb) {
// 	Object.entries(components).forEach(([_, component]) => {
// 		const config = configCb(component)
// 		const StyleDictionary = StyleDictionaryPackage.extend(config)
// 		StyleDictionary.buildAllPlatforms()
// 	})
// }

// ;(async () => {
// 	const components = await getTokens(`./tokens/components/**/*.json`)
// 	Object.entries(components).forEach(([_, component]) => {
// 		buildStyleDictionary(component, getComponentConfig)
// 	})
// })()
