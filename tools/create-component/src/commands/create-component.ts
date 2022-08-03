import { GluegunCommand } from 'gluegun'
const command: GluegunCommand = {
	name: 'create-component',
	description: 'Create new component',
	alias: ['new', 'create', 'generate', 'n'],
	run: async (toolbox) => {
		const { print, prompt, filesystem, template: t } = toolbox
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
		const rootFiles = filesystem.list('src/templates')
		console.log({ rootFiles })
		const filesCopy = rootFiles.reduce((acc, file) => {
			const template = `/${file}`
			// Where to copy this file to.
			const target = `../../components/${props.name}/${file.replace(
				'.ejs',
				''
			)}`
			/*
			  First argument is the template,
			  Second is the target, where to put the file
			  The third is the argument to be passed into the file
			  returns a promise
			*/
			const gen = t.generate({ template, target, props })
			return acc.concat([gen])
		}, [])
		// Wait for all promises to resolve
		await Promise.all(filesCopy)
		// Set permissions for cli to execute
		// filesystem.chmodSync(`${props.name}/bin/card.js`, '755')
		print.info({ props, f })
	},
}

module.exports = command
