import fs from 'fs';
import path from 'node:path';
import {registerTransforms} from '@tokens-studio/sd-transforms';
import StyleDictionaryPackage from 'style-dictionary';
import {brandClasses} from '../formatters/css/brand-classes.js';
import {transformSVG} from '../transforms/transformSVG.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath =
	process.env.NODE_ENV == 'test'
		? path.join(__dirname, '../../', '__test__')
		: path.join(__dirname, '../../');
let tokenStudioThemes;

StyleDictionaryPackage.registerTransform({
	name: 'name/origamiPrivatePrefix',
	type: 'name',
	transformer: (token, options) =>
		isTokenStudioSource(token) ? `_${token.name}` : token.name,
});

registerTransforms(StyleDictionaryPackage, {
	expand: {
		typography: true,
	},
});

StyleDictionaryPackage.registerFormat({
	name: 'css/brand/classes',
	formatter: brandClasses,
});

StyleDictionaryPackage.registerFormat({
	name: 'tooling/esm',
	formatter: ({dictionary}) => {
		return (
			'export default ' +
			'{\n' +
			dictionary.allTokens
				.map(function (token) {
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
				})
				.join(',\n') +
			'\n}' +
			';\n'
		);
	},
});

StyleDictionaryPackage.registerTransform({
	name: 'value/transformSVG',
	type: 'value',
	transformer: transformSVG,
	matcher: token => token.type === 'asset',
	transitive: true,
});

StyleDictionaryPackage.registerTransform({
	name: 'Origami/pxToRem',
	type: 'value',
	transitive: true,
	matcher: token => {
		const types = ['spacing', 'fontSizes', 'borderRadius', 'lineHeights'];
		return types.includes(token.type);
	},
	transformer: token => {
		const defaultWebFontSize = 16;
		let tokenValue = token.value;
		if (tokenValue.includes('px')) {
			tokenValue = tokenValue.replace('px', '');
		}
		tokenValue = `${tokenValue / defaultWebFontSize}rem`;
		return tokenValue;
	},
});

StyleDictionaryPackage.registerFileHeader({
	name: 'customFileHeader',
	fileHeader: defaultMessage => {
		// the fileHeader function should return an array of strings
		// which will be formatted in the proper comment style for a given format
		return [defaultMessage[0]]; // This will remove timestamp from file headers but will leave a comment not to edit files directly
	},
});

StyleDictionaryPackage.registerTransform({
	name: 'Origami/tintGroup',
	type: 'attribute',
	matcher: token => {
		return (
			token.type === 'color' && /palette-[a-zA-Z]+-[0-9]{1,3}$/.test(token.name)
		);
	},
	transformer: token => {
		const tint = token.path[token.path.length - 1].split('-');
		token.origamiTint = {
			base: tint[0],
			value: tint[1],
		};
		return token;
	},
});

/**
 * @callback TokenFilter
 * @param {object} token
 * @returns {boolean}
 */

/**
 * @typedef {Object} CssBuildConfig - Configuration for building CSS from Token Studio design tokens.
 * @property {string[]} sources - The design token files to include.
 * @property {string[]|undefined} [includes] - The component design token files to include. Include tokens will be overridden by "source" attribute tokens. This should be used for sub-brands that reference their parent brand.
 * @property {string} destination - The output file path.
 * @property {TokenFilter|undefined} [tokenFilter] - A function to filter tokens to include.
 * @property {string|undefined} [parentSelector] - A parent CSS selector for generated CSS.
 */

const transformers = [
	'Origami/pxToRem',
	'ts/size/px',
	'ts/size/lineheight',
	'ts/descriptionToComment',
	'ts/typography/css/shorthand',
	'ts/typography/css/fontFamily',
	'ts/border/css/shorthand',
	'ts/shadow/css/shorthand',
	'ts/color/css/hexrgba',
	'ts/color/modifiers',
	'name/cti/kebab',
	'name/origamiPrivatePrefix',
];

/**
 * @param {CssBuildConfig} CssBuildConfig - A string param.
 * @returns {undefined}
 */
export function buildCSS({
	sources,
	includes,
	destination,
	tokenFilter,
	parentSelector,
}) {
	getTokenStudioThemes();
	const config = {
		source: sources,
		include: includes,
		platforms: {
			css: {
				transformGroup: 'css',
				transforms: [...transformers, 'value/transformSVG'],
				buildPath: path.dirname(destination) + '/',
				files: [
					{
						filter: token => {
							if (
								token.original.value === '{DO-NOT-USE}' ||
								token.path[0] === 'DO-NOT-USE'
							) {
								return false;
							}
							return tokenFilter ? tokenFilter(token) : true;
						},
						destination: path.basename(destination),
						format: parentSelector ? 'css/brand/classes' : 'css/variables',
						options: {
							fileHeader: 'customFileHeader',
							outputReferences: true,
							parentSelector,
						},
					},
				],
			},
		},
	};

	const StyleDictionary = StyleDictionaryPackage.extend(config);
	try {
		StyleDictionary.buildAllPlatforms();
	} catch (e) {
		console.warn(e);
	}
}

/**
 * @typedef {Object} MetaBuildConfig - Configuration for building Token Studio design tokens to json for tooling.
 * @property {string[]} sources - The design token files to include.
 * @property {string[]|undefined} [includes] - The component design token files to include. Include tokens will be overridden by "source" attribute tokens. This should be used for sub-brands that reference their parent brand.
 * @property {string} destination - The output file path.
 */

/**
 * @param {MetaBuildConfig} CssBuildConfig - A string param.
 * @returns {undefined}
 */
export function buildMeta({sources, includes, destination}) {
	getTokenStudioThemes();
	const config = {
		source: sources,
		include: includes,
		platforms: {
			tooling: {
				transformGroup: 'js',
				transforms: [...transformers, 'Origami/tintGroup'],
				buildPath: path.dirname(destination) + '/',
				files: [
					{
						filter: token => {
							if (
								token.original.value === '{DO-NOT-USE}' ||
								token.path[0] === 'DO-NOT-USE'
							) {
								return false;
							}
							return true;
						},
						destination: path.basename(destination),
						format: 'tooling/esm',
						options: {
							fileHeader: 'customFileHeader',
						},
					},
				],
			},
		},
	};

	const StyleDictionary = StyleDictionaryPackage.extend(config);
	StyleDictionary.buildAllPlatforms();
}

function getTokenStudioThemes() {
	if (tokenStudioThemes) {
		return tokenStudioThemes;
	}
	const loadJSON = path =>
		JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString());
	tokenStudioThemes = loadJSON(path.join(basePath, 'tokens/$themes.json'));
	return tokenStudioThemes;
}

export function getBrandNames() {
	return getTokenStudioThemes().map(tokenStudioThemeToBrand);
}

export function getBasePath() {
	return basePath;
}

function isSubBrand(theme) {
	return theme.group !== theme.name;
}

function tokenStudioThemeToBrand(theme) {
	return isSubBrand(theme) ? `${theme.group}/${theme.name}` : theme.group;
}

/**
 * Find all token sources for a specific brand.
 * If the brand name a `/` separated string, it is a sub-brand.
 * Sub-brands will include the parent brand's tokens.
 * Include tokens will be overridden by "source" attribute tokens.
 *
 * @param {string} brand
 * @returns {{sources: string[], includes: string[]}} - The source tokens and include tokens for the brand.
 */
export function getBrandSourcesAndIncludes(brand) {
	const theme = getTokenStudioThemes().filter(
		theme => tokenStudioThemeToBrand(theme) === brand
	)[0];
	const selectedTokenSets = Object.keys(theme.selectedTokenSets);

	const sourceTokens = selectedTokenSets.filter(tokenSet => {
		return tokenSet.startsWith(tokenStudioThemeToBrand(theme));
	});
	const includeTokens = selectedTokenSets.filter(tokenSet => {
		return !sourceTokens.includes(tokenSet);
	});

	const sources = sourceTokens.map(tokenSet => {
		return path.join(basePath, `tokens/${tokenSet}.json`);
	});
	const includes = includeTokens.map(tokenSet => {
		return path.join(basePath, `tokens/${tokenSet}.json`);
	});
	return {sources, includes};
}

/*Get token theme from brand in token set file path.*/
function getTokensStudioThemeFromBrand(tokenSet) {
	const tokenSetPaths = tokenSet.split('/').slice(0, 2);
	const subBrandKey = tokenSetPaths.join('/');
	const brandKey = tokenSetPaths[0];

	//Use sub brand key to find if it exists in tokens studios' theme object.
	const subTheme = tokenStudioThemes.find(
		theme => tokenStudioThemeToBrand(theme) === subBrandKey
	);

	if (!subTheme) {
		//If there is no sub brand, then search for brand instead
		return tokenStudioThemes.find(
			theme => tokenStudioThemeToBrand(theme) === brandKey
		);
	}
	return subTheme;
}

function isTokenStudioSource(token) {
	const {filePath} = token;
	const tokenSet = filePath
		.replace(`${process.cwd()}/tokens`, '')
		.replace(/^\//, '')
		.replace('.json', '');

	const theme = getTokensStudioThemeFromBrand(tokenSet);

	return theme ? theme.selectedTokenSets[tokenSet] === 'source' : false;
}

export const nonComponentTokenFilter = (source, brand) =>
	!source.includes(`${brand}/components/`);

if (import.meta.vitest) {
	const {describe, it, expect} = import.meta.vitest;

	describe('filters non component tokens', () => {
		const source = 'core/components/brand/brand.json';
		const brand = 'core';
		it('should return false for component tokens', () => {
			expect(nonComponentTokenFilter(source, brand)).toBe(false);
		});
	});
}
