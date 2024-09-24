import { fileHeader, formattedVariables } from 'style-dictionary/utils';

export async function brandClasses({dictionary, file, options}) {
	const {outputReferences, parentSelector} = options;
	const header = await fileHeader({file});
	return (
		`${header}\n` +
		`${parentSelector} {\n` +
		`${formattedVariables({ format: 'css', dictionary, outputReferences })}\n}\n`
	);
}
