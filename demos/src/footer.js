'use strict';

const data = {
	"theme": "theme-dark",
	"matrix": [
			{
				"title": "Support",
				"items": [
					{ "text": "Help", "href": "#" },
					{ "text": "About Us", "href": "#" }
				]
			},
			{
				"title": "Legal & Privacy",
				"items": [
					{ "text": "Terms & Conditions", "href": "#" },
					{ "text": "Privacy", "href": "#" },
					{ "text": "Cookies", "href": "#" },
					{ "text": "Copyright", "href": "#" }
				]
			},
			{
				"title": "Services",
				"items": [
					{ "text": "Conferences & Events", "href": "#" },
					{ "text": "Individual Subscriptions", "href": "#" },
					{ "text": "Group Subscriptions", "href": "#" },
					{ "text": "Republishing", "href": "#" },
					{ "text": "Contracts & Tenders", "href": "#" },
					{ "text": "Analyst Research", "href": "#" },
					{ "text": "Executive Job Search", "href": "#" },
					{ "text": "Advertise with the FT", "href": "#" },
					{ "text": "Follow the FT on Twitter", "href": "#" }
				]
			},
			{
				"title": "Tools",
				"items": [
					{ "text": "Portfolio", "href": "#" },
					{ "text": "Today's Paper", "href": "#" },
					{ "text": "Alerts Hub", "href": "#" },
					{ "text": "Lexicon", "href": "#" },
					{ "text": "MBA Rankings", "href": "#" },
					{ "text": "Economic Calendar", "href": "#" },
					{ "text": "Newsfeed", "href": "#" },
					{ "text": "Newsletters", "href": "#" },
					{ "text": "Currency Converter", "href": "#" },
					{ "text": "Ebooks", "href": "#" }
				]
			},
			{
				"title": "More from FT Group",
				"items": [
					{ "text": "Agenda", "href": "#" },
					{ "text": "Analyse Africa", "href": "#" },
					{ "text": "Board IQ", "href": "#" },
					{ "text": "Corporate Learning Alliance", "href": "#" },
					{ "text": "DPN: Deutsche Pensions & Investment Nachrichten", "href": "#" },
					{ "text": "ExecSense", "href": "#" },
					{ "text": "FDI Intelligence", "href": "#" },
					{ "text": "Financial Advisor IQ", "href": "#" },
					{ "text": "FT Chinese", "href": "#" },
					{ "text": "FT Live", "href": "#" },
					{ "text": "FT Property Listings", "href": "#" },
					{ "text": "FT Advisor", "href": "#" },
					{ "text": "Fund Fire", "href": "#" },
					{ "text": "Global Risk Regulator", "href": "#" },
					{ "text": "How to Spend It", "href": "#" },
					{ "text": "Ignites", "href": "#" },
					{ "text": "Ignites Asia", "href": "#" },
					{ "text": "Ignites Europe", "href": "#" },
					{ "text": "Investors Chronicle", "href": "#" },
					{ "text": "Mandate Wire", "href": "#" },
					{ "text": "New York Insitute of Finance", "href": "#" },
					{ "text": "Non Executive Directors Club", "href": "#" },
					{ "text": "Pensions Expert", "href": "#" },
					{ "text": "Professional Wealth Management", "href": "#" },
					{ "text": "125 Club", "href": "#" },
					{ "text": "The Banker", "href": "#" },
					{ "text": "The Banker Database", "href": "#" },
					{ "text": "This is Africa", "href": "#" }
				]
			}
	],
	"copyrightYear": "2016",
};

module.exports = function () {
	const ITEMS_PER_COLUMN = 5;

	data.matrix.forEach((column, i) => {
		column.size = Math.ceil(column.items.length / ITEMS_PER_COLUMN);
		column.listId = column.size > 1 ? `o-footer-matrix-list-${i}` : null;
	});

	return data;
};
