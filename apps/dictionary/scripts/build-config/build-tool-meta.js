import {
	buildToolingMetaTokens,
	buildToolingIconTokens,
} from './buildFunctions.js';

function getDestination(brand) {
	return `build/${brand}/_variables.js`;
}
buildToolingMetaTokens(getDestination);
buildToolingIconTokens('build/icons/_variables.js');
