import StyleDictionary from 'style-dictionary';
const {fileHeader, createPropertyFormatter} = StyleDictionary.formatHelpers;

export function brandClasses({dictionary, file, options}) {
	const {outputReferences, parentSelector} = options;

	const formatProperty = createPropertyFormatter({
		outputReferences,
		dictionary,
		format: 'css',
	});

	const cssCustomProperties = dictionary.allTokens.map(formatProperty);

	return (
		`${fileHeader({file})}\n` +
		`${parentSelector} {\n` +
		`${cssCustomProperties.join('\n')}\n}\n`
	);
}
