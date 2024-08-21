export const argTypes = {
	currentPath: {
		options: ['/', '/404'],
		table: {
			defaultValue: {summary: '/'},
		},
		control: {
			type: 'radio',
			labels: {
				'/': 'show',
				'/404': 'hide'
			}
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
		description:
			'By default the logo serves as a home page link, which can be deactivated by providing prop `showLogoLink: false`.',
		table: {
			defaultValue: {summary: 'true'},
		},
	},
	showAskButton: {
		description:
			'Show Ask FT button',
		table: {
			defaultValue: {summary: 'true'},
		},
	},
	data: {
		description:
			'Navigation data for rendering the header links fetched from the navigation API',
	},
	extraHeaderProps: {
		description: "for props that aren't appropriate in Origami",
	},
};
