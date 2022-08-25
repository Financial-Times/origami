import * as jetPack from 'fs-jetpack';
import {ejsToHTML, HtmlStringToFile} from './ejsFunctions';

const componentsPath = jetPack.path('..', '..', 'components');

export async function createStoryBookBoilerPlate(toolbox) {
	const {prompt, print} = toolbox;
	const props = await prompt.ask(componentName);
	print.warning(`ok! generating "${props.name}" in components folder!`);
	await copyTemplates(props);
	print.success(`yay! "${props.name}" is ready!`);
}

const componentName = {
	type: 'autocomplete',
	name: 'name',
	message: 'Choose component:',
	limit: 10,
	initial: 2,
	choices: findComponentsWithoutStoryBook(),
};

function findComponentsWithoutStoryBook() {
	const components = jetPack
		.cwd(componentsPath)
		.find({
			matching: '*',
			directories: true,
			recursive: false,
			files: false,
		})
		.filter(dir => {
			const componentDir = jetPack.path(componentsPath, dir, 'stories');
			return !jetPack.exists(componentDir);
		})
		.map(dir => dir.replace('../../components/', ''));
	return components;
}

async function copyTemplates(props) {
	const storyBookFiles = jetPack
		.find('src/templates/stories')
		.map(file => file.split('templates/')[1]);
	const tsx = jetPack
		.find('src/templates/src/tsx')
		.map(file => file.split('templates/')[1]);
	const files = [...storyBookFiles, ...tsx];
	await Promise.all(
		files.map(async file => {
			const templateStr = await ejsToHTML(file, {
				props: {...props, name: trimName(props.name)},
			});
			const target = `${componentsPath}/${props.name}/${file
				.replace('<name>', trimName(props.name))
				.replace('.ejs', '')}`;
			HtmlStringToFile(target, templateStr);
		})
	);
}

function trimName(name) {
	return name.replace(/o-|n-|g-/, '');
}
