import {buildComponentTokens} from './buildFunctions.js';

const componentName = process.argv[2];

function getDestination(brand, component) {
	return `../../components/${component}/src/css/tokens/${brand}/${component}/_variables.css`;
}

buildComponentTokens(componentName, getDestination);
