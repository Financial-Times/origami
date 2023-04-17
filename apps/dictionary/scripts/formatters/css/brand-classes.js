const StyleDictionary = require('style-dictionary');
const {fileHeader, formattedVariables, createPropertyFormatter} = StyleDictionary.formatHelpers;

function brandClasses({dictionary, file, options}) {
	const brand = Object.keys(dictionary.properties).filter((brand) => brand.match('o-brand'))[0];
	const className = `.${brand}`
	const {outputReferences} = options;
	const formatProperty = createPropertyFormatter({
		outputReferences,
		dictionary,
		format: 'css'
	});

	const brandPrefix = /o-brand-[A-Za-z0-9]*-/
	const tokens = dictionary.allTokens.map((token) => {
		token.name = token.name.match(brandPrefix) ? token.name.replace(brandPrefix, '') : token.name;
		const form = formatProperty(token)
		return form;
	});

	return `${fileHeader({file})}` +
		`${className} {\n` +
		`${tokens.join('\n')}\n}`
}


module.exports = {brandClasses};
