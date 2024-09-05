// import StyleDictionary from 'style-dictionary';
import { fileHeader, createPropertyFormatter, formattedVariables } from 'style-dictionary/utils';

export async function brandClasses({dictionary, file, options}) {
	const {outputReferences, parentSelector} = options;
	const header = await fileHeader({file});

	// const formatProperty = createPropertyFormatter({
	// 	outputReferences,
	// 	dictionary,
	// 	format: 'css',
	// });

	// const cssCustomProperties = dictionary.allTokens.map(formatProperty);

	return (
		`${header}\n` +
		`${parentSelector} {\n` +
		`${formattedVariables({ format: 'css', dictionary, outputReferences })}\n}\n`
	);
}
