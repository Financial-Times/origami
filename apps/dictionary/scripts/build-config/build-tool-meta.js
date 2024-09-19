import {
	buildToolingMetaTokens,
	buildToolingIconTokens,
} from './buildFunctions.js';

function getDestination(brand) {
	return `build/${brand}/_variables.js`;
}
await buildToolingMetaTokens(getDestination);
await buildToolingIconTokens('build/icons/_variables.js');
