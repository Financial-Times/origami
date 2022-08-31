import * as jetPack from 'fs-jetpack';
import {GluegunCommand} from 'gluegun';
import treee = require('tree-cli');
import {questions} from '../../helpers/questions';
import {
	getComponentName,
	getFinalConfirmation,
	generateKeywords,
	oComponentsPath,
	addComponentInWorkspace,
	origamiRoot,
} from '../../helpers/utils';
import {createStoryBookBoilerPlate} from '../../helpers/create-storybook';

const command: GluegunCommand = {
	name: 'create-component',
	description: 'Create new component',
	alias: ['new', 'create', 'n'],
	run: async toolbox => {
		if (toolbox.parameters.first === 'storybook') {
			return await createStoryBookBoilerPlate(toolbox);
		}
		const {print, prompt, system, origami} = toolbox;
		const name = await getComponentName(toolbox);
		const answers = await prompt.ask(questions);
		const props = {
			name,
			...answers,
			keywords: generateKeywords(answers.keywords),
		};
		const confirm = await getFinalConfirmation(toolbox, props);
		if (!confirm) {
			print.error(`The component "${props.name}" was cancelled.`);
			return;
		}
		print.highlight(confirm);
		print.warning(`ok! generating "${props.name}" in components folder!`);
		await origami.copyTemplates(props);
		print.success(`yay! "${props.name}" is ready!`);
		print.info(`here's what it looks like:`);
		const tree = await treee({
			base: jetPack.path(oComponentsPath, props.name),
			noreport: true,
			l: 4,
			ignore: ['node_modules'],
		});
		print.info(tree.report);
		print.info(`adding "${props.name}" to workspace...`);
		addComponentInWorkspace(name);
		print.success(`yay! "${props.name}" has been added to workspace!`);
		const spinner = print.spin(
			`Registering component in the monorepo (This might take some time)...`
		);
		await system.run(`cd ${origamiRoot} && npm install`);
		await system.run(`cd ${origamiRoot} && npm run regenerate`);
		spinner.stop();
		print.success('All Done!');
		print.warning(`To start local dev server, run:`);
		print.highlight(
			`npm run watch -w components/${props.name}`
		);
		print.info('or');
		print.highlight(
			`npm run storybook`
		);
	},
};

module.exports = command;
