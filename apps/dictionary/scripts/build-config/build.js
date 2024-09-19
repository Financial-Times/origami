import {buildBrandForCSS, buildIconCSS} from './buildFunctions.js';


console.warn(
	`Warning. Ignore the "could not resolve reference" warnings.\nCheck built output to confirm. This will be resolved in a future version of Token Studio's transforms:\nhttps://github.com/tokens-studio/sd-transforms/issues/255#issuecomment-1911231988\n👇`
);

await buildIconCSS('src/css/tokens/_icons.css');
await buildBrandForCSS(getDestinationForBrand);

function getDestinationForBrand(brand) {
	return `src/css/tokens/${brand}/_variables.css`;
}
