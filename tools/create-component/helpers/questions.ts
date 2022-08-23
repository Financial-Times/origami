export const componentName = {
	type: 'input',
	name: 'name',
	message: 'component name (required)',
	validate: (value) => {
		if (!value) {
			return 'please enter a name for your component\nhttps://origami.ft.com/docs/components/code/#naming-conventions'
		}
		return true
	},
}

const description = {
	name: 'description',
	type: 'input',
	message: 'description (required)',
	validate: (value) => {
		if (!value) {
			return 'please enter a description for your component\nhttps://origami.ft.com/docs/manifests/origami-json/#description'
		}
		return true
	},
}
const keywords = {
	name: 'keywords',
	type: 'input',
	message: 'keywords (to help discoverability in the registry)',
}

const form = {
	name: 'team',
	type: 'form',
	message: 'Please provide the following information:',
	choices: [
		{
			name: 'email',
			message: 'Support team email (required)',
			initial: 'origami.support@ft.com',
		},
		{
			name: 'slack',
			message: 'Support team slack channel (required)',
			initial: '#origami-support',
		},
		{
			name: 'githubTeam',
			message: 'Support Github team (required)',
			initial: 'origami-core',
		},
	],
}

const status = {
	type: 'select',
	name: 'status',
	message:
		'support status (https://origami.ft.com/docs/manifests/origami-json/#supportstatus)',
	initial: 'experimental',
	choices: ['active', 'experimental', 'maintained'],
}
const brands = {
	type: 'multiselect',
	name: 'brands',
	message: 'choose templates for files:',
	initial: ['core'],
	choices: ['core', 'internal', 'whitelabel'],
}
const javascript = {
	name: 'javascript',
	type: 'confirm',
	message:
		'will your component use JavaScript? (this will add some helpful Origami JavaScript boilerplate)',
	initial: true,
}
const scss = {
	name: 'scss',
	type: 'confirm',
	message:
		'will your component use Sass? (this will add some helpful Origami Sass boilerplate)',
	initial: true,
}
export const questions = [
	description,
	keywords,
	form,
	status,
	brands,
	javascript,
	scss,
]
