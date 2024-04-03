const StatusMapping = {
	None: '',
	'Coming soon': 'comingsoon',
	'In progress': 'inprogress',
	Closed: 'closed',
};

const ThemeMapping = {
	None: '',
	'Extra Article': 'extra-article',
	Highlight: 'highlight',
};

const ModifierMapping = {
	None: '',
	'Small stacked': 'stacked',
	'Small image on right': 'image-on-right',
	'Large portrait': 'large-portrait',
	'Large landscape': 'large-landscape',
	'Hero centre': 'centre',
	'Hero image': 'hero-image',
	'Top story landscape': 'landscape',
	'Top story big': 'big-story',
	'Live blog post': 'post'
};

export const argTypes = {
	status: {
		name: 'Live Blog Status',
		options: Object.keys(StatusMapping),
		mapping: StatusMapping,
		control: 'select',
	},
	imageSize: {
		name: 'Image Size',
		options: ['XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'],
		control: 'select',
	},
	headshotTint: {
		name: 'Headshot tint',
		options: [],
		control: {type: 'select'},
	},
	accessLevel: {
		name: 'Access level',
		options: ['free', 'registered', 'subscribed', 'premium'],
		control: 'select',
	},
	layout: {
		name: 'Layout',
		options: ['small', 'large', 'hero', 'top-story'],
		control: 'select',
	},
	theme: {
		name: 'Theme',
		options: Object.keys(ThemeMapping),
		mapping: ThemeMapping,
		control: 'select',
	},
	parentTheme: {
		name: 'Parent Theme',
		options: Object.keys(ThemeMapping),
		mapping: ThemeMapping,
		control: 'select',
	},
	modifiers: {
		name: 'Modifiers',
		options: Object.keys(ModifierMapping),
		mapping: ModifierMapping,
		control: 'select',
	},
	publishedDate: {name: 'Published Date', control: 'date'},
	firstPublishedDate: {name: 'First Published Date', control: 'date'},
	customSlot: {},
};
