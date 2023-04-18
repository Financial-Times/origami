const StyleDictionary = require('style-dictionary');
const {fileHeader, createPropertyFormatter} = StyleDictionary.formatHelpers;

function brandClasses({dictionary, file, options}) {
	const className = `.${options.className}`
	const {outputReferences} = options;
	const formatProperty = createPropertyFormatter({
		outputReferences,
		dictionary,
		format: 'css'
	});

	const brandTokens = [];

	//Extract brand tokens only.
	dictionary.allTokens.forEach((token) => {
		if( token.filePath.match('o-brand-') ) {
			brandTokens.push(formatProperty(token));
		}
	})

	return `${fileHeader({file})}` +
		`${className} {\n` +
		`${brandTokens.join('\n')}\n}`
}


module.exports = {brandClasses};
