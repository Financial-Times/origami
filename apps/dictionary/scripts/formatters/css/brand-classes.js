const StyleDictionary = require('style-dictionary');
const {fileHeader, createPropertyFormatter} = StyleDictionary.formatHelpers;

function brandClasses({dictionary, file, options}) {
	const {outputReferences, excludePrefix, classNames} = options;
	if(excludePrefix && !Array.isArray(excludePrefix)) {
		throw new Error('excludeFiles must be array');
	}

	const outputClassName = classNames.reduce((acc, className) => `${acc}.${className} `, '');
	const formatProperty = createPropertyFormatter({
		outputReferences,
		dictionary,
		format: 'css'
	});

	const brandTokens = [];

	//Extract brand tokens only.
	dictionary.allTokens.forEach((token) => {
		if (excludePrefix) {
			const excludePattern = new RegExp(`(${excludePrefix.join('|')})`, 'g');

			if (token.name.match(excludePattern)) {
				return;
			}
		}
		brandTokens.push(formatProperty(token));
	})

	return `${fileHeader({file})}\n` +
		`${outputClassName}{\n` +
		`${brandTokens.join('\n')}\n}\n`
}


module.exports = { brandClasses };
