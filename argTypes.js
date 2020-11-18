exports.argTypes = {
	status: {
		name: 'Live Blog Status',
		control: {
			type: 'select',
			options: {
				None: '',
				'Coming soon': 'comingsoon',
				'In progress': 'inprogress',
				Closed: 'closed'
			}
		}
	},
	imageSize: {
		name: 'Image Size',
		control: { type: 'select', options: ['XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'] }
	},
	headshotTint: { name: 'Headshot tint', control: { type: 'select', options: { Default: '' } } },
	accessLevel: {
		name: 'Access level',
		control: { type: 'select', options: ['free', 'registered', 'subscribed', 'premium'] }
	},
	layout: { name: 'Layout', control: { type: 'select', options: ['small', 'large', 'hero', 'top-story'] } },
	theme: {
		name: 'Theme',
		control: { type: 'select', options: { None: '', Extra: 'extra-article', 'Special Report': 'highlight' } }
	},
	parentTheme: {
		name: 'Parent Theme',
		control: { type: 'select', options: { None: '', Extra: 'extra-article', 'Special Report': 'highlight' } }
	},
	modifiers: {
		name: 'Modifiers',
		control: {
			type: 'select',
			options: {
				None: '',
				'Small stacked': 'stacked',
				'Small image on right': 'image-on-right',
				'Large portrait': 'large-portrait',
				'Large landscape': 'large-landscape',
				'Hero centre': 'centre',
				'Hero image': 'hero-image',
				'Top story landscape': 'landscape',
				'Top story big': 'big-story'
			}
		}
	},
	publishedDate: { name: 'Published Date', control: { type: 'date' } },
	firstPublishedDate: { name: 'First Published Date', control: { type: 'date' } }
}
