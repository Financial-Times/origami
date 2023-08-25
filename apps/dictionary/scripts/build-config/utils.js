import fs from "fs"

export class ConfigBuilder {
	constructor(StyleDictionaryPackage) {
		this.config = {
			platforms: {
				css: {
					transformGroup: "css",
				},
			},
		}
		this.StyleDictionaryPackage = StyleDictionaryPackage
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
	 * set include files
	 * @param {string[]} includeFiles - array of include files
	 * */
	setIncludeFiles(includeFiles) {
		this.config.include = includeFiles
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
		const StyleDictionary = this.StyleDictionaryPackage.extend(this.config)
		StyleDictionary.buildAllPlatforms(this.config)
	}
}


const loadJSON = path =>
	JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
const tokenStudioThemes = loadJSON("../../tokens/$themes.json")
export function getBrands() {
	return tokenStudioThemes.map(theme => {
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
