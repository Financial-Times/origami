const StyleDictionary = require('style-dictionary');
const {fileHeader, formattedVariables} = StyleDictionary.formatHelpers;

function brandClasses({dictionary, file, options}) {
	const brand = Object.keys(dictionary.properties)[0];
	const className = `.o-brand-${brand}`
	const {outputReferences} = options;
	return `${fileHeader({file})}` +
	`${className} {\n` +
	`${formattedVariables({format: 'css', dictionary, outputReferences})}\n }`
}


module.exports = {brandClasses};
