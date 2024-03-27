import {
	buildCSS,
	getBrandNames,
	getBrandSources,
	getBrandIncludes,
} from './utils.js';

function buildComponentTokens(componentName) {
	const brands = getBrandNames();

	brands.forEach(brand => {
		const brandSources = getBrandSources(brand);
		const destination = `../../components/${componentName}/src/css/tokens/${brand}/${componentName}/_variables.css`;
		const brandIncludes = getBrandIncludes(brand);
		const brandSelector = `[data-o3-brand="${brand.split('/').slice(-1)}"]`;
		const componentSelector = `.${componentName}`;
		const parentSelector = `${brandSelector} ${componentSelector}`;

		buildCSS({
			includes: brandIncludes,
			sources: brandSources,
			destination,
			tokenFilter: token => {
				return token.name.match(`^_?(${componentName})`);
			},
			parentSelector,
		});
	});
}

const componentName = process.argv[2];
buildComponentTokens(componentName);
