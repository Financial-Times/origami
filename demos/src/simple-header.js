const drawer = require('./drawer');

module.exports = function () {
	return {
		hasMenu: true,
		hasMyFT: true,
		isSignedIn: true,



		nav: {
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
			]

		},

		drawer: drawer()
	};
};
