import {StyleDictionaryPackageWithTransforms} from './config/styledictionary.js';
import {getBrandSourcesAndIncludes, getBrandNames} from './utils.js';
import {cssConfigForBrand} from './config/platforms/css.js';
import {toolingConfigForBrand} from './config/platforms/tooling.js';
import {sassConfigForBrand} from './config/platforms/sass.js';

const brands = getBrandNames();
for (const brand of brands) {
	await buildForBrand(brand);
}

/**
 * @param {string} brand - A string param.
 * @returns {Promise<undefined>}
 */
export async function buildForBrand(brand) {
	console.log(`\n💅 ${brand}: Building tokens`);

	const {sources, includes} = getBrandSourcesAndIncludes(brand);
	const config = {
		source: sources,
		include: includes,
		preprocessors: ['tokens-studio'],
		expand: {
			include: ['typography'],
		},
		log: {
			warnings: 'disabled', // As we split build outputs we expect tokens to be filtered out.
			verbosity: 'verbose', // When we get an error, we want to know why.
			errors: {
				brokenReferences: 'throw', // Ensure we know when a referenced tokens is missing.
			},
		},
		platforms: {
			css: cssConfigForBrand(brand),
			tooling: toolingConfigForBrand(brand),
			sass: sassConfigForBrand(brand),
		},
	};
	const StyleDictionary = new StyleDictionaryPackageWithTransforms(config);

	try {
		await StyleDictionary.buildAllPlatforms();
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
}
