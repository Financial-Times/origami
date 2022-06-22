export const argTypes = {
	status: {
		name: 'Live Blog Status',
		options: ['', 'comingsoon', 'inprogress', 'closed'],
		control: {
			type: 'select',
			labels: {
				'': 'None',
				comingsoon: 'Coming soon',
				inprogress: 'In progress',
				closed: 'Closed',
			},
		},
	},
	imageSize: {
		name: 'Image Size',
		options: ['XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'],
		control: 'select',
	},
	// headshotTint: {
	// 	// Not in use
	// 	name: 'Headshot tint',
	// 	control: {type: 'select', options: {Default: ''}},
	// },
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
		options: ['', 'extra-article', 'highlight'],
		control: {
			type: 'select',
			labels: {
				'': 'None',
				'extra-article': 'Extra',
				highlight: 'Special Report',
			},
		},
	},
	parentTheme: {
		name: 'Parent Theme',
		options: ['', 'extra-article', 'highlight'],
		control: {
			type: 'select',
			labels: {
				'': 'None',
				'extra-article': 'Extra',
				highlight: 'Special Report',
			},
		},
	},
	modifiers: {
		name: 'Modifiers',
		options: [
			'',
			'stacked',
			'image-on-right',
			'large-portrait',
			'large-landscape',
			'centre',
			'hero-image',
			'landscape',
			'big-story',
		],
		control: {
			type: 'select',
			labels: {
				'': 'None',
				stacked: 'Small stacked',
				'image-on-right': 'Small image on right',
				'large-portrait': 'Large portrait',
				'large-landscape': 'Large landscape',
				centre: 'Hero centre',
				'hero-image': 'Hero image',
				landscape: 'Top story landscape',
				'big-story': 'Top story big',
			},
		},
	},
	publishedDate: {name: 'Published Date', control: 'date'},
	firstPublishedDate: {name: 'First Published Date', control: 'date'},
};
