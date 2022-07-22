export const argTypes = {
	currentPath: {
		options: {show: '/', hide: '/404'},
		table: {
			defaultValue: {summary: 'show'},
		},
		control: {
			type: 'radio',
		},
	},
	variant: {
		description:
			"Adds a class name to the header element ('simple' | 'large-logo' | string)",
		table: {
			defaultValue: {summary: 'simple'},
		},
	},
	userIsAnonymous: {
		description: 'Marks a user as anonymous',
		table: {
			defaultValue: {summary: 'false'},
		},
	},
	userIsLoggedIn: {
		description: 'Marks a user as logged in',
		table: {
			defaultValue: {summary: 'false'},
		},
	},
	showUserNavigation: {
		description:
			'Show user navigation options such as `Sign out` or `Subscribe`',
		table: {
			defaultValue: {summary: 'true'},
		},
	},
	showSubNavigation: {
		description:
			'Show the sub-navigation component which may include the crumbtrail',
		table: {
			defaultValue: {summary: 'true'},
		},
	},
	showStickyHeader: {
		description: 'Enable rendering of the sticky header component',
		table: {
			defaultValue: {summary: 'true'},
		},
	},
	showMegaNav: {
		description: 'Enable rendering of the drop-down "mega-nav"',
		table: {
			defaultValue: {summary: 'true'},
		},
	},
	userIsSubscribed: {
		description: 'Marks a user as subscribed',
		table: {
			defaultValue: {summary: 'false'},
		},
	},
	showLogoLink: {
		description: 'Marks FT logo as a link',
		table: {
			defaultValue: {summary: 'false'},
		},
	},
	data: {
		description:
			'Navigation data for rendering the header links fetched from the navigation API',
	},
};
