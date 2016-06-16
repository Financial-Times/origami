const header = require('./header');

module.exports = function () {
	const data = header();

	const subsections = {
		'World': [
			{
				name: 'All World',
				url: '#'
			},
			{
				name: 'World Economy',
				url: '#'
			},
			{
				name: 'US',
				url: '#'
			},
			{
				name: 'Europe',
				url: '#'
			},
			{
				name: 'Latin America',
				url: '#'
			},
			{
				name: 'Asia Pacific',
				url: '#'
			},
			{
				name: 'Africa',
				url: '#'
			},
			{
				name: 'Middle East and Africa',
				url: '#'
			},
			{
				name: 'Emerging Markets',
				url: '#'
			},
			{
				name: 'Science & Environment',
				url: '#'
			}
		],
		'UK': [
			{
				name: 'All UK',
				url: '#'
			},
			{
				name: 'UK Politics & Policy',
				url: '#'
			},
			{
				name: 'UK Economy',
				url: '#'
			},
			{
				name: 'England',
				url: '#'
			},
			{
				name: 'Scotland',
				url: '#'
			},
			{
				name: 'Wales',
				url: '#'
			},
			{
				name: 'N. Ireland',
				url: '#'
			}
		],
		'Companies': [
			{
				name: 'All Companies',
				url: '#'
			},
			{
				name: 'Technology',
				url: '#'
			},
			{
				name: 'Financials',
				url: '#'
			},
			{
				name: 'Energy',
				url: '#'
			},
			{
				name: 'Retail & Consumer',
				url: '#'
			},
			{
				name: 'Industrials',
				url: '#'
			},
			{
				name: 'Telecoms',
				url: '#'
			},
			{
				name: 'Health',
				url: '#'
			},
			{
				name: 'Media',
				url: '#'
			},
			{
				name: 'Transport',
				url: '#'
			}
		],
		'Markets': [
			{
				name: 'All Markets',
				url: '#'
			},
			{
				name: 'Markets Data',
				url: '#'
			},
			{
				name: 'Commodities',
				url: '#'
			},
			{
				name: 'Currencies',
				url: '#'
			},
			{
				name: 'Equities',
				url: '#'
			},
			{
				name: 'Capital Markets',
				url: '#'
			},
			{
				name: 'Trading',
				url: '#'
			}
		],
		'Opinion': [
			{
				name: 'All Opinion',
				url: '#'
			},
			{
				name: 'FT View',
				url: '#'
			},
			{
				name: 'The Big Read',
				url: '#'
			},
			{
				name: 'Lex',
				url: '#'
			},
			{
				name: 'Columnists',
				url: '#'
			}
		],
		'Work & Careers': [
			{
				name: 'All Work & Career',
				url: '#'
			},
			{
				name: 'Business Education',
				url: '#'
			},
			{
				name: 'Management',
				url: '#'
			},
			{
				name: 'Entrepreneurship',
				url: '#'
			},
			{
				name: 'Recruitment',
				url: '#'
			},
			{
				name: 'Business Books',
				url: '#'
			}
		],
		'Life & Arts': [
			{
				name: 'All Life & Arts',
				url: '#'
			},
			{
				name: 'Magazine',
				url: '#'
			},
			{
				name: 'House & Home',
				url: '#'
			},
			{
				name: 'Books',
				url: '#'
			},
			{
				name: 'Food & Drink',
				url: '#'
			},
			{
				name: 'Travel',
				url: '#'
			},
			{
				name: 'Style',
				url: '#'
			},
			{
				name: 'Arts',
				url: '#'
			},
			{
				name: 'Sports',
				url: '#'
			},
			{
				name: 'Music',
				url: '#'
			},
			{
				name: 'Film, TV & Radio',
				url: '#'
			}
		]
	};

	data.nav.desktop.forEach(function (item) {
		if (subsections.hasOwnProperty(item.name)) {
			item.hasMega = true;
			item.subsections = subsections[item.name];
		}
	});

	return data;
};