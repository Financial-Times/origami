import { GluegunCommand } from 'gluegun'
const command: GluegunCommand = {
	name: 'create-component',
	description: 'Create new component',
	alias: ['new', 'create', 'generate', 'n'],
	run: async (toolbox) => {
		const { print, prompt, o } = toolbox
		// console.log({ template })
		// text input
		const askComponentName = {
			type: 'input',
			name: 'name',
			message: 'Name of the new component:',
		}
		const chooseFiles = {
			type: 'multiselect',
			name: 'multi-select-files',
			message: 'choose templates for files:',
			limit: 2,
			choices: [
				{ name: 'aqua', value: '#00ffff' },
				{ name: 'black', value: '#000000' },
			],
		}

		// multiple choice
		const chooseFramework = {
			type: 'select',
			name: 'templates',
			message: 'What shoes are you wearing?',
			choices: ['JavaScript', 'React'],
		}

		// ask a series of questions
		const questions = [askComponentName, chooseFiles, chooseFramework]
		const props = await prompt.ask(questions)
		const f = await prompt.confirm('Ya`ll ready for this?')

		await o.copyFiles(props)

		print.info({ props, f })
	},
}

module.exports = command
