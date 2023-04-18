const StyleDictionary = require('style-dictionary');
const {fileHeader, createPropertyFormatter} = StyleDictionary.formatHelpers;

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
	const brandTokens = [];

	//Extract brand tokens only.
	dictionary.allTokens.forEach((token) => {
		if( token.filePath.match('o-brand-') ) {
			token.name = token.name.replace(brandPrefix, '');
			brandTokens.push(formatProperty(token));
		}
	})

	return `${fileHeader({file})}` +
		`${className} {\n` +
		`${brandTokens.join('\n')}\n}`
}


module.exports = {brandClasses};
