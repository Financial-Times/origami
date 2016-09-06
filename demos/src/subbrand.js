const header = require('./header');

module.exports = function () {
	const data = header();

	data.nav.mobile[0].selected = false;
	data.nav.desktop[0].selected = false;
	data.nav.desktop[1].selected = true;

	data.subnav = true;
	data.currentNav = {
		name: 'Life & Arts',
		children: [
			{
				name: 'House & Home',
				href: '#'
			},
			{
				name: 'Books',
				href: '#'
			},
			{
				name: 'Food & Drink',
				href: '#'
			},
			{
				name: 'Travel',
				href: '#'
			},
			{
				name: 'Style',
				href: '#'
			},
			{
				name: 'Arts',
				href: '#'
			},
			{
				name: 'FT Magazine',
				href: '#'
			}
		]
	};

	return data;
};
