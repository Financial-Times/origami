import {buildBrandCSS, buildIconCSS} from './buildFunctions';

console.warn(
	`Warning. Ignore the "could not resolve reference" warnings.\nCheck built output to confirm. This will be resolved in a future version of Token Studio's transforms:\nhttps://github.com/tokens-studio/sd-transforms/issues/255#issuecomment-1911231988\n👇`
);

buildBrandCSS(getDestinationForBrand);
buildIconCSS('css/icons.css');

function getDestinationForBrand(brand) {
	return `src/css/tokens/${brand}/_variables.css`;
}
