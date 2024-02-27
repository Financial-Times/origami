import fs from 'fs';
import path from 'node:path';
import {registerTransforms} from '@tokens-studio/sd-transforms';
import StyleDictionaryPackage from 'style-dictionary';
import {brandClasses} from '../formatters/css/brand-classes.js';
import {transformSVG} from '../transforms/transformSVG.js';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath = path.join(__dirname, '../../');

StyleDictionaryPackage.registerTransform({
	name: 'name/origamiPrivatePrefix',
	type: 'name',
	transformer: token => (tokenIsSource(token) ? token.name : `_${token.name}`),
});

registerTransforms(StyleDictionaryPackage, {
	expand: {
		typography: true,
	},
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
	matcher: token =>
		token.type === 'color' && /palette-[a-zA-Z]+-[0-9]{1,3}$/.test(token.name),
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
 * @property {string} destination - The output file path.
 * @property {TokenFilter|undefined} [tokenFilter] - A function to filter tokens to include.
 * @property {string|undefined} [parentSelector] - A parent CSS selector for generated CSS.
 */

/**
 * @param {CssBuildConfig} CssBuildConfig - A string param.
 * @returns {undefined}
 */
export function buildCSS({sources, destination, tokenFilter, parentSelector}) {
	const config = {
		source: sources,
		platforms: {
			css: {
				transformGroup: 'css',
				transforms: [
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
					'value/transformSVG',
					'name/origamiPrivatePrefix',
				],
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
	StyleDictionary.buildAllPlatforms();
}

/**
 * @typedef {Object} MetaBuildConfig - Configuration for building Token Studio design tokens to json for tooling.
 * @property {string[]} sources - The design token files to include.
 * @property {string} destination - The output file path.
 */

/**
 * @param {MetaBuildConfig} CssBuildConfig - A string param.
 * @returns {undefined}
 */
export function buildMeta({sources, destination}) {
	const config = {
		source: sources,
		platforms: {
			tooling: {
				transformGroup: 'js',
				transforms: [
					'Origami/pxToRem',
					'ts/size/px',
					'ts/size/lineheight',
					'ts/descriptionToComment',
					'ts/typography/css/shorthand',
					'ts/border/css/shorthand',
					'ts/shadow/css/shorthand',
					'ts/color/css/hexrgba',
					'ts/color/modifiers',
					'name/cti/kebab',
					'Origami/tintGroup',
				],
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
							return tokenIsSource(token);
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
	const loadJSON = path =>
		JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString());
	return loadJSON('../../tokens/$themes.json');
}

export function getBrandNames() {
	return getTokenStudioThemes().map(tokenStudioThemeToBrand);
}

export function getBasePath() {
	return basePath;
}

function tokenStudioThemeToBrand(theme) {
	if (theme.group != theme.name) {
		return `${theme.group}/${theme.name}`;
	}
	return theme.group;
}

export function getBrandSources(brand) {
	return getTokenStudioThemes().flatMap(theme => {
		const selectedTokenSets = Object.keys(theme.selectedTokenSets);
		const componentTokenSets = selectedTokenSets.filter(
			tokenSet =>
				theme.selectedTokenSets[tokenSet] === 'enabled' &&
				tokenStudioThemeToBrand(theme) === brand
		);
		return componentTokenSets.map(tokenSet =>
			path.join(basePath, `tokens/${tokenSet}.json`)
		);
	});
}

export function tokenIsSource(token) {
	return token.isSource ? true : false;
}
