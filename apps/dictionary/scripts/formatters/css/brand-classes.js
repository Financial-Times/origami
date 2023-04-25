const StyleDictionary = require('style-dictionary');
const {fileHeader, createPropertyFormatter} = StyleDictionary.formatHelpers;

function brandClasses({dictionary, file, options}) {
	const {outputReferences, cssVarPrefix, className} = options;
	const outputClassName = `.${className}`
	const formatProperty = createPropertyFormatter({
		outputReferences,
		dictionary,
		format: 'css',
		formatting: {
			prefix: `--${cssVarPrefix}`,
			separator: ':',
			indentation: '  '
		} // None of this will apply if the format property is set, so we need to ensure all of the css syntax is set here https://github.com/amzn/style-dictionary/blob/9a188cd3b1766250e10b1b5f94e961cd01e8a453/lib/common/formatHelpers/createPropertyFormatter.js#L60-L87
	});

	const brandTokens = [];

	//Extract brand tokens only.
	dictionary.allTokens.forEach((token) => {
		if (token.filePath.match('o-brand-')) {
			brandTokens.push(formatProperty(token));
		}
	})

	return `${fileHeader({file})}` +
		`${outputClassName} {\n` +
		`${brandTokens.join('\n')}\n}`
}


module.exports = {brandClasses};
