module.exports = function () {
	return {
		// Anonymous bar
		anon: true,

		// Top bar
		top: {
			hasDrawer: false,
			hasMyFT: true
		},

		// Search bar
		search: true,

		// Navigation bar
		nav: {
			mobile: [
				{
					name: 'Home',
					url: '#',
					selected: true
				},
				{
					name: 'FastFT',
					url: '#'
				},
				{
					name: 'Markets Data',
					url: '#'
				}
			],
			desktop: [
				{
					name: 'Home',
					url: '#',
					selected: true
				},
				{
					name: 'World',
					url: '#'
				},
				{
					name: 'UK',
					url: '#'
				},
				{
					name: 'Companies',
					url: '#'
				},
				{
					name: 'Markets',
					url: '#'
				},
				{
					name: 'Opinion',
					url: '#'
				},
				{
					name: 'Work & Careers',
					url: '#'
				},
				{
					name: 'Life & Arts',
					url: '#'
				}
			],
			isSignedIn: false
		}
	};
};
