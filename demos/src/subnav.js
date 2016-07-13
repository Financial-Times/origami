const header = require('./header');

module.exports = function () {
	const data = header();

	data.nav.mobile[0].selected = false;
	data.nav.desktop[0].selected = false;
	data.nav.desktop[1].selected = true;

	data.subnav = true;
	data.currentNav = {
		name: 'US & Canada',
		ancestors: [
			{
				name: 'World',
				href: '#'
			}
		],
		children: [
			{
				name: 'US Economy',
				href: '#'
			},
			{
				name: 'US Politics & Policy',
				href: '#'
			},
			{
				name: 'US Companies',
				href: '#'
			}
		]
	};

	return data;
};
