import path from 'node:path';
import {
	buildCSS,
	getBrandNames,
	getBrandSources,
	getBasePath,
} from './utils.js';

function buildBrandCSS() {
	const brands = getBrandNames();
	brands.forEach(brand => {
		const nonComponentTokenFilter = source =>
			!source.includes(`${brand}/components/`);
		const sources = getBrandSources(brand).filter(nonComponentTokenFilter);
		const destination = `src/css/tokens/${brand}/_variables.css`;
		const parentSelector = `[data-o3-brand="${brand.split('/').slice(-1)}"]`;
		buildCSS({sources, destination, parentSelector});
	});
}

function buildIconCSS() {
	const sources = [path.join(getBasePath(), 'tokens/icons/icons.json')];
	const destination = 'src/css/tokens/_icons.css';
	buildCSS({sources, destination});
}

console.warn(
	`Warning. Ignore the "could not resolve reference" warnings.\nCheck built output to confirm. This will be resolved in a future version of Token Studio's transforms:\nhttps://github.com/tokens-studio/sd-transforms/issues/255#issuecomment-1911231988\n👇`
);
buildBrandCSS();
buildIconCSS();
