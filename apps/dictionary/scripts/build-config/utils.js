import fs from "fs"
import {registerTransforms} from "@tokens-studio/sd-transforms"

export class ConfigBuilder {
	constructor(StyleDictionaryPackage) {
		StyleDictionaryPackage.registerFileHeader(this._setFileHeaderConfig())
		StyleDictionaryPackage.registerTransform(this._registerPxToRem())
		this.config = {
			platforms: {
				css: {
					transformGroup: "css",
					transforms: [
						"Origami/pxToRem",
						"ts/size/px",
						"ts/size/lineheight",
						"ts/descriptionToComment",
						"ts/typography/css/shorthand",
						"ts/border/css/shorthand",
						"ts/shadow/css/shorthand",
						"ts/color/css/hexrgba",
						"ts/color/modifiers",
						"name/cti/kebab",
					],
				},
			},
		}
		this.StyleDictionaryPackage = StyleDictionaryPackage
	}

	/**
	 *
	 * @returns {object} - file header config
	 */
	_setFileHeaderConfig() {
		return {
			name: "customFileHeader",
			fileHeader: defaultMessage => {
				// the fileHeader function should return an array of strings
				// which will be formatted in the proper comment style for a given format
				return [defaultMessage[0]] // This will remove timestamp from file headers but will leave a comment not to edit files directly
			},
		}
	}

	/**
	 * register px to rem transform
	 * @returns {object} - transform config
	 * */
	_registerPxToRem() {
		return {
			name: "Origami/pxToRem",
			type: "value",
			transitive: true,
			matcher: token => {
				const types = ["spacing", "fontSizes", "borderRadius"]
				return types.includes(token.type)
			},
			transformer: token => {
				const defaultWebFontSize = 16
				let tokenValue = token.value
				if (tokenValue.includes("px")) {
					tokenValue = tokenValue.replace("px", "")
				}
				tokenValue = `${tokenValue / defaultWebFontSize}rem`
				return tokenValue
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
	 * set include files
	 * @param {string[]} includeFiles - array of include files
	 * */
	setIncludeFiles(includeFiles) {
		this.config.include = includeFiles
		return this
	}

	/**
	 * set transforms
	 * @param {string[]} [transforms] - array of token transformers
	 * */
	setTransforms(transforms) {
		const additionalTransforms = transforms || []
		this.config.platforms.css.transforms = [
			...this.config.platforms.css.transforms,
			...additionalTransforms,
		]
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
	 * @param {string} [config[].options.fileHeader] - class names for token file
	 * */
	setFilesConfig(config) {
		this.config.platforms.css.files = config.map(item => {
			if (!item.options.fileHeader) {
				item.options.fileHeader = "customFileHeader"
			}
			return item
		})
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
		registerTransforms(this.StyleDictionaryPackage, {
			expand: {
				typography: true,
			},
		})
		this.validateConfig()
		const StyleDictionary = this.StyleDictionaryPackage.extend(this.config)
		StyleDictionary.buildAllPlatforms(this.config)
	}
}

const loadJSON = path =>
	JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString())
export const tokenStudioThemes = loadJSON("../../tokens/$themes.json")
