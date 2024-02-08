import path from 'path';
import {
	buildMeta,
	getBrandNames,
	getBrandSources,
	getBasePath,
} from './utils.js';

function buildToolingMetaTokens() {
	const brands = getBrandNames();
	brands.forEach(brand => {
		const sources = getBrandSources(brand);
		const destination = `build/${brand}/_variables.js`;
		buildMeta({sources, destination});
	});
}

function buildToolingIconTokens() {
	const sources = [path.join(getBasePath(), 'tokens/icons/icons.json')];
	const destination = `build/icons/_variables.js`;
	buildMeta({sources, destination});
}

buildToolingMetaTokens();
buildToolingIconTokens();
