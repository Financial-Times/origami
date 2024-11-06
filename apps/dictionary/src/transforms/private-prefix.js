import {tokenStudioThemeToBrand, getTokenStudioThemes} from '../utils.js';

const privatePrefix = token => {
	return isTokenStudioSource(token) ? `_${token.name}` : token.name;
};

/*Get token theme from brand in token set file path.*/
export function getTokensStudioThemeFromBrand(tokenSet) {
	const tokenSetPaths = tokenSet.split('/').slice(0, 2);
	const subBrandKey = tokenSetPaths.join('/');
	const brandKey = tokenSetPaths[0];

	//Use sub brand key to find if it exists in tokens studios' theme object.
	const subTheme = getTokenStudioThemes().find(
		theme => tokenStudioThemeToBrand(theme) === subBrandKey
	);

	if (!subTheme) {
		//If there is no sub brand, then search for brand instead
		return getTokenStudioThemes().find(
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

export {privatePrefix};
