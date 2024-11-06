import fs from 'node:fs';
import path from 'node:path';

/**
 * @callback TokenFilter
 * @param {object} token
 * @returns {boolean}
 */

/**
 * @typedef {Object} MetaBuildConfig - Configuration for building Token Studio design tokens to json for tooling.
 * @property {string[]} sources - The design token files to include.
 * @property {string[]|undefined} [includes] - The component design token files to include. Include tokens will be overridden by "source" attribute tokens. This should be used for sub-brands that reference their parent brand.
 * @property {string} destination - The output file path.
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

export function getBrandNames() {
	return getTokenStudioThemes().map(tokenStudioThemeToBrand);
}

export function getBasePath() {
	return process.cwd();
}

function isSubBrand(theme) {
	return theme.group !== theme.name;
}

export function tokenStudioThemeToBrand(theme) {
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
