const StyleDictionaryPackage = require("style-dictionary")
const {registerTransforms} = require("@tokens-studio/sd-transforms")
const {brandClasses} = require("../formatters/css/brand-classes")
const {transformSVG} = require("../transforms/transformSVG")
const themes = require("../../tokens/$themes.json")
const {ConfigBuilder} = require("./configBuilder")

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

class ConfigBuilder {
	constructor() {
		this.config = {
			platforms: {
				css: {
					transformGroup: "css",
				},
			},
		}
	}

	/**
	 * set source files
	 * @param {string[]} sources - array of source files
	 *  */
	setSources(sources) {
		this.config.source = sources
		return this
	}

	/**
	 * set transforms
	 * @param {string[]} transforms - array of token transformers
	 * */
	setTransforms(transforms) {
		this.config.platforms.css.transforms = transforms
		return this
	}

	/**
	 * set build path
	 * @param {string} buildPath - path to build folder for tokens
	 * */

	setBuildPath(buildPath) {
		this.config.platforms.css.buildPath = buildPath
		return this
	}

	/**
	 * set files config
	 * @param {object[]} config - array of file configs
	 * @param {string} [config[].filter] - filter name for tokens
	 * @param {string} config[].destination - destination file name
	 * @param {string} config[].format - format for token file
	 * @param {object} config[].options - options for token file
	 * @param {boolean} config[].options.outputReferences - output references for token file
	 * @param {string[]} [config[].options.classNames] - class names for token file
	 * */
	setFilesConfig(config) {
		this.config.platforms.css.files = config
		return this
	}

	// check if config has source, transforms, buildPath and files set in config object, otherwise throw error with missing properties
	validateConfig() {
		if (!this.config.source) {
			throw new Error("Source not set in config")
		}
		if (!this.config.platforms.css.transforms) {
			throw new Error("Transforms not set in config")
		}
		if (!this.config.platforms.css.buildPath) {
			throw new Error("Build path not set in config")
		}
		if (!this.config.platforms.css.files) {
			throw new Error("Files not set in config")
		}
	}

	// build dictionary
	buildDictionary() {
		this.validateConfig()
		const StyleDictionary = StyleDictionaryPackage.extend(this.config)
		StyleDictionary.buildAllPlatforms(this.config)
	}
}

function buildBrandTokens() {
	const brands = themes.map(theme => {
		const brandName =
			theme.group != theme.name ? `${theme.group}/${theme.name}` : theme.group
		return {
			name: brandName,
			sources: Object.keys(theme.selectedTokenSets).map(
				tokenSet => `tokens/${tokenSet}.json`
			),
		}
	})

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
					classNames: [`o-brand-${brand.name}`],
				},
			},
		]
		new ConfigBuilder()
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

	new ConfigBuilder()
		.setSources(["tokens/icons/icons.json"])
		.setTransforms(iconTransformers)
		.setBuildPath("build/css/icons/")
		.setFilesConfig(iconsFileConfig)
		.buildDictionary()
}

registerTransforms(StyleDictionaryPackage)
buildBrandTokens()
buildIconTokens()
