import { filesystem } from 'gluegun'

export async function createStoryBookBoilerPlate(toolbox) {
	const { prompt, print } = toolbox
	const props = await prompt.ask(componentName)
	console.log(props.name)
	print.warning(`ok! generating "${props.name}" in components folder!`)
	await copyTemplates(toolbox, props)
	print.success(`yay! "${props.name}" is ready!`)
}

const componentName = {
	type: 'autocomplete',
	name: 'name',
	message: 'Choose component:',
	limit: 10,
	initial: 2,
	choices: findComponentsWithoutStoryBook(),
}

function findComponentsWithoutStoryBook() {
	const components = filesystem
		.subdirectories('../../components')
		.filter((dir) => !filesystem.exists(`${dir}/stories`))
		.map((dir) => dir.replace('../../components/', ''))
	return components
}

async function copyTemplates(toolbox, props) {
	const storyBookFiles = filesystem
		.find('src/templates/stories')
		.map((file) => file.split('templates/')[1])
	const tsx = filesystem
		.find('src/templates/src/tsx')
		.map((file) => file.split('templates/')[1])
	const files = [...storyBookFiles, ...tsx]
	await Promise.all(
		files.map(async (file) => {
			const template = `/${file}`
			// Where to copy this file to.
			const target = `../../components/${props.name}/${file
				.replace('<name>', trimName(props.name))
				.replace('.ejs', '')}`
			return await toolbox.template.generate({
				template,
				target,
				props: { ...props },
			})
		})
	)
}

function trimName(name) {
	return name.replace('o-', '')
}
