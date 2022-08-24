import * as jetPack from 'fs-jetpack';
import * as ejs from 'ejs';
import {GluegunToolbox} from 'gluegun';
import {
	oComponentsPath,
	templateFiles,
	jsFilesNotToInclude,
	sassFilesNotToInclude,
} from '../../helpers/utils';
import {PropsType} from '../types';
import * as ejsHelpers from '../../helpers/name-formats';

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
	toolbox.origami = {
		copyTemplates: props => {
			if (props.name.includes('test')) {
				return;
			}
			return copyTemplates(props);
		},
	};
};

export async function copyTemplates(props: PropsType): Promise<void> {
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
				props: {...props, ...ejsHelpers},
			});
			const target = `${oComponentsPath}/${props.name}/${file
				.replace('<name>', props.name)
				.replace('.ejs', '')}`;
			HtmlStringToFile(target, templateStr);
		})
	);
}

export const ejsToHTML = async (
	file: string,
	data: {props: PropsType}
): Promise<string> => {
	const filePath = jetPack.path('src', 'templates', file);
	const template = jetPack.read(filePath);
	const str = await ejs.render(template, data, {
		async: true,
	});
	return str;
};

export const HtmlStringToFile = (targetLocation: string, str: string): void => {
	jetPack.write(targetLocation, str);
};
