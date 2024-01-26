import path from "path"
import {fileURLToPath} from "url"
import StyleDictionaryPackage from "style-dictionary"
import {brandClasses} from "../formatters/css/brand-classes.js"
import {transformSVG} from "../transforms/transformSVG.js"
import {MetaConfigBuilder, tokenStudioThemes} from "./utils.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const basePath = path.join(__dirname, "../../")

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
				.filter(
					tokenSet =>
						!tokenSet.startsWith(`${brandName}/components/`) &&
						theme.selectedTokenSets[tokenSet] === "enabled"
				)
				.map(tokenSet => `tokens/${tokenSet}.json`),
		}
	})
}

StyleDictionaryPackage.registerFormat({
	name: "tooling/esm",
	formatter: ({dictionary, platform}) => {
		return 'export default ' + '{\n' + dictionary.allTokens.map(function(token) {
			const value = {
				shortName: token.path[token.path.length - 1],
				value: token.value,
				originalValue: token.original.value,
				type: token.type,
				description: token.description,
				origamiKeys: token.origamiKeys,
				path: token.path,
				origamiTint: token.origamiTint,
				css: `--${token.name}`,
				figma: token.path.join('/'),
			};
			return `\t"${token.name}": ${JSON.stringify(value, null, '\t\t')}`;
		  }).join(',\n') + '\n}' + ';\n';
	}
})

function buildToolingMetaTokens() {
	const brands = getBrands()
	brands.forEach(brand => {
		const filesConfig = [
			{
				filter: "filter/doNotUse",
				destination: "_variables.js",
				format: 'tooling/esm',
				options: {
				},
			},
		]
		brand.sources = brand.sources.map(source => path.join(basePath, source))
		new MetaConfigBuilder(StyleDictionaryPackage)
			.setSources(brand.sources)
			.setBuildPath(`build/${brand.name}/`)
			.setFilesConfig(filesConfig)
			.buildDictionary()
	})
}

function buildToolingIconTokens() {
	const iconsFileConfig = [
		{
			destination: "_variables.js",
			format: 'tooling/esm',
			options: {
				outputReferences: true,
			},
		},
	]

	new MetaConfigBuilder(StyleDictionaryPackage)
		.setSources([path.join(basePath,  "tokens/icons/icons.json")])
		.setBuildPath("build/icons/")
		.setFilesConfig(iconsFileConfig)
		.buildDictionary()
}

buildToolingMetaTokens()
buildToolingIconTokens()
