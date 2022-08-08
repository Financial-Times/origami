import { GluegunToolbox } from 'gluegun'

// add your CLI-specific functionality here, which will then be accessible
// to your commands
module.exports = (toolbox: GluegunToolbox) => {
	toolbox.o = {
		copyTemplates: (props) => copyTemplates(toolbox, props),
	}

	// enable this if you want to read configuration in from
	// the current folder's package.json (in a "create-component" property),
	// create-component.config.json, etc.
	// toolbox.config = {
	//   ...toolbox.config,
	//   ...toolbox.config.loadConfig("create-component", process.cwd())
	// }
}

async function copyTemplates(toolbox, props) {
	const { filesystem } = toolbox
	const files = filesystem
		.find('src/templates')
		.map((file) => file.split('templates/')[1])
	await Promise.all(
		files.map(async (file) => {
			const template = `/${file}`
			// Where to copy this file to.
			const target = `../../components/${props.name}/${file.replace(
				'.ejs',
				''
			)}`
			return await toolbox.template.generate({
				template,
				target,
				props: { ...props },
			})
		})
	)
}
