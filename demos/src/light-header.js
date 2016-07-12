module.exports = function () {
	return {
		hasMenu: true,
		search: true,
		hasMyFT: true,
		nav: {
			mobile: [
				{
					name: 'Home',
					url: '#',
					selected: true
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
