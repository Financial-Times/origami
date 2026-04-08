import fs from 'node:fs';
import path from 'node:path';

/**
 * @callback TokenFilter
 * @param {object} token
 * @returns {boolean}
 */

/**
 * @typedef {import('./../../build.js')} Brand
 */

/**
 * @typedef {Object} MetaBuildConfig - Configuration for building Token Studio design tokens to json for tooling.
 * @property {string[]} sources - The design token files to include.
 * @property {string[]|undefined} [includes] - The component design token files to include. Include tokens will be overridden by "source" attribute tokens. This should be used for sub-brands that reference their parent brand.
 * @property {string} destination - The output file path.
 */

/**
 * Load and memoise Tokens Studio's theme config from file system.
 * @returns {Object} A parsed JSON object of Tokens Studio's theme config.
 */
export function getTokenStudioThemes() {
	let tokenStudioThemes;
	if (tokenStudioThemes) {
		return tokenStudioThemes;
	}
	const loadJSON = path =>
		JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString());
	tokenStudioThemes = loadJSON(path.join(getBasePath(), 'tokens/$themes.json'));
	return tokenStudioThemes;
}

/**
 * Get brands and sub brands from Tokens Studio config.
 *
 * @returns {Brand[]} An array of brands and sub brands.
 */
export function getBrandNames() {
	return getTokenStudioThemes().map(tokenStudioThemeToBrand);
}

/**
 * Get the current working directory (wraps the system cwd command).
 * @returns {string} - the current working directory
 */
export function getBasePath() {
	return process.cwd();
}

function isSubBrand(theme) {
	return theme.group !== theme.name;
}

/**
 * Map Tokens Studio theme to our brand/sub-brand syntax
 *
 * @param {Object} theme - Object representing a theme in Tokens Studio
 * @returns {Brand} - A parsed brand string
 */
export function tokenStudioThemeToBrand(theme) {
	return isSubBrand(theme) ? `${theme.group}/${theme.name}` : theme.group;
}

/**
 * Find all token sources for a specific brand.
 * If the brand name contains a `/` separated string, it is a sub-brand.
 * Sub-brands will include the parent brand's tokens.
 * Include tokens will be overridden by "source" attribute tokens.
 *
 * @param {Brand} brand
 * @returns {{sources: string[], includes: string[]}} - The source tokens and include tokens for the brand.
 */
export function getBrandSourcesAndIncludes(brand) {
	const theme = getTokenStudioThemes().find(
		theme => tokenStudioThemeToBrand(theme) === brand
	);
	const selectedTokenSets = Object.keys(theme.selectedTokenSets);

	const sourceTokens = selectedTokenSets.filter(tokenSet => {
		return tokenSet.startsWith(tokenStudioThemeToBrand(theme));
	});
	const includeTokens = selectedTokenSets.filter(tokenSet => {
		return !sourceTokens.includes(tokenSet);
	});

	const sources = sourceTokens.map(tokenSet => {
		return path.join(getBasePath(), `tokens/${tokenSet}.json`);
	});
	const includes = includeTokens.map(tokenSet => {
		return path.join(getBasePath(), `tokens/${tokenSet}.json`);
	});

	sources.push(path.join(getBasePath(), 'tokens/icons/icons.json'));
	return {sources, includes};
}
