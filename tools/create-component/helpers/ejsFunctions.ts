import * as jetPack from 'fs-jetpack';
import * as ejs from 'ejs';
import {PropsType} from '../src/types';
import {
	oComponentsPath,
	templateFiles,
	jsFilesNotToInclude,
	sassFilesNotToInclude,
} from './utils';

export async function copyTemplates(
	props: PropsType,
	targetPath: string = oComponentsPath
): Promise<void> {
	let files = templateFiles;
	if (!props.javascript) {
		files = files.filter(file => !jsFilesNotToInclude.includes(file));
	}

	if (!props.scss) {
		files = files.filter(file => !sassFilesNotToInclude.includes(file));
	}
	await Promise.all(
		files.map(async file => {
			const templateStr = await ejsToHTML(file, {
				props: {...props},
			});
			const target = `${targetPath}/${props.name}/${file
				.replace('<name>', props.name)
				.replace('.ejs', '')}`;
			HtmlStringToFile(target, templateStr);
		})
	);
}

export const ejsToHTML = async (
	file: string,
	data?: {props: PropsType}
): Promise<string> => {
	const filePath = jetPack.path('src', 'templates', file);
	const template = jetPack.read(filePath);
	data ? (data.props.lowercase = lowercase) : null;
	data ? (data.props.titleCase = titleCase) : null;
	data ? (data.props.camelCase = camelCase) : null;
	data ? (data.props.withoutPrefix = withoutPrefix) : null;
	const str = await ejs.render(template, data, {
		async: true,
	});
	return str;
};

export const HtmlStringToFile = (targetLocation: string, str: string): void => {
	jetPack.write(targetLocation, str);
};

const lowercase = string => string.toLowerCase();
const titleCase = string =>
	string
		.split('-')
		.map(word => word.replace(word[0], word[0].toUpperCase()))
		.join('');
const camelCase = string =>
	string.replace(/\-+(.)/g, (match, chr) => chr.toUpperCase());
const withoutPrefix = string => string.replace(/^[a-z]-/g, '');
