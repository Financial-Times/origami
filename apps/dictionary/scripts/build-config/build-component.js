import {
	buildCSS,
	getBrandNames,
	getBrandSourcesAndIncludes,
} from './utils.js';

function buildComponentTokens(componentName) {
	const brands = getBrandNames();

	brands.forEach(brand => {
		const {sources, includes} = getBrandSourcesAndIncludes(brand);
		const destination = `../../components/${componentName}/src/css/tokens/${brand}/${componentName}/_variables.css`;
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

const componentName = process.argv[2];
buildComponentTokens(componentName);
