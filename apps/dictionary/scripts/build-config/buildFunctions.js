import path from 'node:path';
import {
	buildCSS,
	getBrandNames,
	getBrandSourcesAndIncludes,
	getBasePath,
	nonComponentTokenFilter,
	buildMeta,
} from './utils.js';

/**
 * Description of the function
 * @callback GetDestination
 * @param {String} brand - brand name
 * @param {String} [componentName] - componentName description
 * @returns {String} - destination path
 */

/**
 * Build CSS variables for a brand
 * @param {GetDestination} getDestination - A function that returns the destination path
 * @returns {void}
 */
export function buildBrandForCSS(getDestination) {
	const brands = getBrandNames();
	brands.forEach(brand => {
		const {sources, includes} = getBrandSourcesAndIncludes(brand);
		const destination = getDestination(brand);
		const parentSelector = `[data-o3-brand="${brand.split('/').slice(-1)}"]`;
		buildCSS({
			sources: sources.filter(source => nonComponentTokenFilter(source, brand)),
			includes: includes.filter(include =>
				nonComponentTokenFilter(include, brand)
			),
			destination,
			parentSelector,
		});
	});
}

/**
 * Build CSS variables for a component
 * @param {string} componentName - The name of the component
 * @param {GetDestination} getDestination - A function that returns the destination path
 * @returns {void}
 */
export function buildComponentTokens(componentName, getDestination) {
	const brands = getBrandNames();

	brands.forEach(brand => {
		const {sources, includes} = getBrandSourcesAndIncludes(brand);
		const destination = getDestination(brand, componentName);
		const brandSelector = `[data-o3-brand="${brand.split('/').slice(-1)}"]`;
		const componentSelector = `.${componentName}`;
		const parentSelector = `${brandSelector} ${componentSelector}`;

		buildCSS({
			includes,
			sources,
			destination,
			tokenFilter: token => {
				return token.name.match(`^_?(${componentName})`);
			},
			parentSelector,
		});
	});
}

/**
 * Build CSS variables for icons
 * @param {string} destination - The destination path
 * @returns {void}
 */
export function buildIconCSS(destination) {
	const sources = [path.join(getBasePath(), 'tokens/icons/icons.json')];
	buildCSS({sources, destination});
}
/**
 * Build CSS foundation variables for Astro
 * @param {GetDestination} getDestination - A function that returns the destination path
 * @returns {void}
 */

export function buildToolingMetaTokens(getDestination) {
	const brands = getBrandNames();
	brands.forEach(brand => {
		const {sources, includes} = getBrandSourcesAndIncludes(brand);
		const destination = getDestination(brand);
		buildMeta({
			sources: sources.filter(source => nonComponentTokenFilter(source, brand)),
			includes: includes.filter(include =>
				nonComponentTokenFilter(include, brand)
			),
			destination,
		});
	});
}

/**
 * Build CSS variables for Astro build
 * @param {string} destination - The destination path
 * @returns {void}
 */

export function buildToolingIconTokens(destination) {
	const sources = [path.join(getBasePath(), 'tokens/icons/icons.json')];
	buildMeta({sources, destination});
}
