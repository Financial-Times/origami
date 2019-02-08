export default function () {
	const editionsData = {
		current: {
			name: 'UK',
			id: 'uk'
		},
		others: [
			{
				name: 'International',
				id: 'international'
			}
		]
	};

	const navData = [
		{
			heading: {
				name: 'Top sections'
			},
			items: [
				{
					name: 'Home',
					href: '#',
					selected: true
				},
				{
					name: 'World',
					href: '#',
					hasChildren: true,
					children: [
						{
							name: 'World Economy',
							href: '#'
						},
						{
							name: 'UK',
							href: '#'
						},
						{
							name: 'US',
							href: '#'
						},
						{
							name: 'China',
							href: '#'
						},
						{
							name: 'Africa',
							href: '#'
						},
						{
							name: 'Asia Pacific',
							href: '#'
						},
						{
							name: 'Emerging Markets',
							href: '#'
						},
						{
							name: 'Europe',
							href: '#'
						},
						{
							name: 'Latin America',
							href: '#'
						},
						{
							name: 'Middle East and Africa',
							href: '#'
						}
					]
				},
				{
					name: 'UK',
					href: '#',
					hasChildren: true,
					children: [
						{
							name: 'UK Economy',
							href: '#'
						},
						{
							name: 'UK Politics & Policy',
							href: '#'
						},
						{
							name: 'UK Companies',
							href: '#'
						}
					]
				},
				{
					name: 'Companies',
					href: '#',
					hasChildren: true,
					children: [
						{
							name: 'Energy',
							href: '#'
						},
						{
							name: 'Financials',
							href: '#'
						},
						{
							name: 'Health',
							href: '#'
						},
						{
							name: 'Industrials',
							href: '#'
						},
						{
							name: 'Media',
							href: '#'
						},
						{
							name: 'Retail & Consumer',
							href: '#'
						},
						{
							name: 'Technology',
							href: '#'
						},
						{
							name: 'Telecoms',
							href: '#'
						},
						{
							name: 'Transport',
							href: '#'
						}
					]
				},
				{
					name: 'Markets',
					href: '#',
					hasChildren: true,
					children: [
						{
							name: 'Alphaville',
							href: '#'
						},
						{
							name: 'Markets Data',
							href: '#'
						},
						{
							name: 'Capital Markets',
							href: '#'
						},
						{
							name: 'Commodities',
							href: '#'
						},
						{
							name: 'Currencies',
							href: '#'
						},
						{
							name: 'Equities',
							href: '#'
						},
						{
							name: 'Fund Management',
							href: '#'
						},
						{
							name: 'Trading',
							href: '#'
						}
					]
				},
				{
					name: 'Opinion',
					href: '#',
					hasChildren: true,
					children: [
						{
							name: 'Columnists',
							href: '#'
						},
						{
							name: 'FT View',
							href: '#'
						},
						{
							name: 'The Big Read',
							href: '#'
						},
						{
							name: 'Lex',
							href: '#'
						},
						{
							name: 'Alphaville',
							href: '#'
						},
						{
							name: 'Obituaries',
							href: '#'
						},
						{
							name: 'Letters',
							href: '#'
						}
					]
				},
				{
					name: 'Work & Careers',
					href: '#',
					hasChildren: true,
					children: [
						{
							name: 'Business School Rankings',
							href: '#'
						},
						{
							name: 'Business Education',
							href: '#'
						},
						{
							name: 'Entrepreneurship',
							href: '#'
						},
						{
							name: 'Recruitment',
							href: '#'
						},
						{
							name: 'Business Books',
							href: '#'
						}
					]
				},
				{
					name: 'Life & Arts',
					href: '#',
					hasChildren: true,
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
							name: 'Sports',
							href: '#'
						},
						{
							name: 'Music',
							href: '#'
						},
						{
							name: 'Film, TV & Radio',
							href: '#'
						},
						{
							name: 'Magazine',
							href: '#'
						}
					]
				},
				{
					name: 'Personal Finance',
					href: '#',
					hasChildren: true,
					children: [
						{
							name: 'Property & Mortgages',
							href: '#'
						},
						{
							name: 'Investments',
							href: '#'
						},
						{
							name: 'Pensions',
							href: '#'
						},
						{
							name: 'Tax',
							href: '#'
						},
						{
							name: 'Bankings & Savings',
							href: '#'
						}
					]
				},
				{
					name: 'Science & Environment',
					href: '#'
				}
			]
		},
		{
			heading: {
				name: 'FT recommends'
			},
			items: [
				{
					name: 'Lex',
					href: '#'
				},
				{
					name: 'Alphaville',
					href: '#'
				},
				{
					name: 'Lunch with the FT',
					href: '#'
				},
				{
					name: 'Video',
					href: '#'
				},
				{
					name: 'Special Reports',
					href: '#'
				},
				{
					name: 'News feed',
					href: '#'
				},
				{
					name: 'Newsletters',
					href: '#'
				}
			]
		},
		{
			items: [
				{
					name: 'My FT',
					href: '#',
					variation: 'secondary'
				},
				{
					name: 'Portfolio',
					href: '#',
					variation: 'secondary'
				},
				{
					name: 'Today\'s Paper',
					href: '#',
					variation: 'secondary'
				}
			]
		}
	];

	// Adds indexes for aria attributes
	navData.forEach((section) => {
		section.items.map((item, index) => {
			if (!section.heading && index === 0) {
				item.divide = true;
			}
			item.index = index;
			return item;
		});
	});

	const userData = {
		isSignedIn: false,
		name: 'User\'s name'
	};

	const drawer = {
		nav: navData,
		editions: editionsData,
		user: userData
	};

	return drawer;
};
