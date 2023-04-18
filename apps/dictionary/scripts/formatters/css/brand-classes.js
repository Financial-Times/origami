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
	let brandTokens = [];
	let palletteTokens = [];

	// Split out the branded tokens from the pallette tokens.
	// The pallette tokens exist in this scope so that the brands can reference them.
	// A better future solution may be to not include the pallette tokens in this brand file and instead export them separately.
	dictionary.allTokens.forEach((token) => {
		if( token.filePath.match('o-brand-') ) {
			token.name = token.name.replace(brandPrefix, '');
			brandTokens.push(formatProperty(token));
		} else {
			palletteTokens.push(formatProperty(token));
		}

	})

	return `${fileHeader({file})}` +
		`:root {\n${palletteTokens.join('\n')}\n}\n\n` +
		`${className} {\n` +
		`${brandTokens.join('\n')}\n}`
}


module.exports = {brandClasses};
