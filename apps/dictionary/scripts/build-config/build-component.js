const StyleDictionaryPackage = require("style-dictionary")
const {brandClasses} = require("../formatters/css/brand-classes")
const {nameOrigamiPrivatePrefix} = require("../transforms/nameOrigamiPrefix")
const {transformSVG} = require("../transforms/transformSVG")
const {registerTransforms} = require("@tokens-studio/sd-transforms")
const glob = require("glob")

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

registerTransforms(StyleDictionaryPackage)

const getComponentConfig = brand => ({
	source: brand.sources,
	include: [
		"tokens/archive/base/color.json",
		"tokens/archive/use-case/o-brand-*.json",
	],
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
				"name/origamiPrivatePrefix",
			],
			buildPath: "./",
			files: [
				{
					destination: `${brand.exportPath}/_variables.css`,
					format: "css/brand/classes",
					options: {
						outputReferences: true,
						classNames: [`o-brand-${brand.name}`, `${component}`],
						excludePrefix: ["color-base", "usecase"],
					},
				},
			],
		},
	},
})

const getIconConfig = component => ({
	source: component.sources,
	include: [`tokens/icons/icons.json`],
	platforms: {
		css: {
			transformGroup: "css",
			transforms: [
				"ts/descriptionToComment",
				"name/origamiPrivatePrefix",
				"value/transformSVG",
			],
			buildPath: "./",
			files: [
				{
					destination: `../../components/${component.name}/src/css/icons/_variables.css`,
					format: "css/variables",
					options: {
						outputReferences: true,
						excludePrefix: ["icons"],
					},
				},
			],
		},
	},
})

const tokenPathsToTreeObject = tokenPaths => {
	const tree = {}
	tokenPaths.forEach(tokenPath => {
		const tokenPathArray = tokenPath.split("/")
		const componentName = tokenPathArray[tokenPathArray.length - 3]
		const brandName = tokenPathArray[tokenPathArray.length - 2]

		if (!tree[componentName]) {
			tree[componentName] = {}
		}
		if (!tree[componentName][brandName]) {
			tree[componentName][brandName] = {
				name: brandName,
				sources: [tokenPath],
				exportPath: `../../components/${componentName}/src/css/${brandName}`,
			}
		} else {
			tree[componentName][brandName].sources.push(tokenPath)
		}
	})
	return tree
}

const getTokens = async (path, ignorePath) => {
	let tokenPaths
	try {
		tokenPaths = await glob(path, {
			nodir: true,
			ignore: ignorePath,
		})
	} catch (err) {
		throw new Error(`Error reading file system: ${err}`)
	}

	return tokenPathsToTreeObject(tokenPaths)
}

function buildStyleDictionary(components, configCb) {
	Object.entries(components).forEach(([_, component]) => {
		const config = configCb(component)
		const StyleDictionary = StyleDictionaryPackage.extend(config)
		StyleDictionary.buildAllPlatforms()
	})
}

;(async () => {
	const components = await getTokens(
		`./tokens/archive/components/**/*.json`,
		"**/icons.json"
	)
	const icons = await getTokens(`./tokens/archive/components/**/icons.json`)
	buildStyleDictionary(icons.components, getIconConfig)
	Object.entries(components).forEach(([_, component]) => {
		buildStyleDictionary(component, getComponentConfig)
	})
})()
