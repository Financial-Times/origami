import * as jetPack from 'fs-jetpack';
import {componentName, questions} from './questions';

export const oComponentsPath = jetPack.path('..', '..', 'components');

export const templateFiles = jetPack
	.find('src/templates')
	.map(file => file.split('templates/')[1]);

export const jsFilesNotToInclude = [
	'src/js/<name>.js.ejs',
	'test/<name>.test.js.ejs',
	'test/helpers/fixtures.js.ejs',
	'main.js.ejs',
];

export const sassFilesNotToInclude = [
	'src/scss/_brand.scss.ejs',
	'src/scss/_variables.scss.ejs',
	'test/scss/index.test.scss',
	'test/scss/_main.test.scss.ejs',
	'main.scss.ejs',
];

export async function getComponentName(toolbox) {
	const {prompt, print} = toolbox;
	const nameAnswer = await prompt.ask(componentName);
	const sanitized = sanitizeName(nameAnswer.name);
	const sanityCheck = await prompt.confirm(`Is "${sanitized}" okay?`, true);

	if (!sanityCheck) {
		return getComponentName(toolbox);
	}
	if (findExistingComponents().includes(sanitized)) {
		print.error(`Component "${sanitized}" already exists.`);
		return getComponentName(toolbox);
	}

	return sanitized;
}
export function sanitizeName(name) {
	return name
		.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`) // lowers capitalized letters, adds '-' before each (newComponent => new-component)
		.toLowerCase()
		.replace(/([^a-z-])/g, '-') // replaces any characters that are not a-z or a '-' with a hyphen
		.replace(/(-{2,})/g, '-') // replaces double hyphen with single hyphen
		.replace(/(^-|-$)/g, ''); // replaces hyphen if at the beginning or end of string
}

export async function getFinalConfirmation(toolbox, props) {
	const {prompt, print} = toolbox;
	print.debug(props, 'Component summary');

	const finalConfirm = await prompt.confirm(
		'Do you want to create this component?',
		true
	);
	if (finalConfirm) {
		return props;
	}
	const changeConfirm = await prompt.confirm(
		'Do you want to change the component details?',
		false
	);
	if (!finalConfirm && changeConfirm) {
		const responses = await prompt.ask({
			type: 'multiselect',
			name: 'change',
			message: 'What would you like to change?',
			choices: Object.keys(props),
		});
		let name = props.name;
		let keywords = props.keywords;

		if (responses.change.includes('name')) {
			name = await getComponentName(toolbox);
		}

		const newAnswers = await prompt.ask(
			questions.filter(q => responses.change.includes(q.name))
		);

		if (responses.change.includes('keywords')) {
			keywords = generateKeywords(newAnswers.keywords);
		}

		const changedAnswers = {
			...props,
			name,
			...newAnswers,
			keywords,
		};

		return await getFinalConfirmation(toolbox, changedAnswers);
	}
}

function findExistingComponents() {
	return jetPack.list(oComponentsPath);
}

export function generateKeywords(input) {
	return [...new Set(input.split(/\s*[\s,]\s*/).filter(Boolean))];
}
