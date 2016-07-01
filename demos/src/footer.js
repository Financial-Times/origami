'use strict';

const data = {
	"theme": "theme-dark",
	"matrix": [
		[
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
					{ "text": "Contracts & Tenders", "href": "#" }
				]
			},
			{
				"items": [
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
					{ "text": "MBA Rankings", "href": "#" }
				]
			},
			{
				"items": [
					{ "text": "Economic Calendar", "href": "#" },
					{ "text": "Newsfeed", "href": "#" },
					{ "text": "Newsletters", "href": "#" },
					{ "text": "Currency Converter", "href": "#" },
					{ "text": "Ebooks", "href": "#" }
				]
			}
		],
		[
			{
				"title": "More from FT Group",
				"items": [
					{ "text": "Agenda", "href": "#" },
					{ "text": "Analyse Africa", "href": "#" },
					{ "text": "Board IQ", "href": "#" },
					{ "text": "Corporate Learning Alliance", "href": "#" },
					{ "text": "DPN: Deutsche Pensions & Investment Nachrichten", "href": "#" }
				]
			},
			{
				"items": [
					{ "text": "ExecSense", "href": "#" },
					{ "text": "FDI Intelligence", "href": "#" },
					{ "text": "Financial Advisor IQ", "href": "#" },
					{ "text": "FT Chinese", "href": "#" },
					{ "text": "FT Live", "href": "#" }
				]
			},
			{
				"items": [
					{ "text": "FT Property Listings", "href": "#" },
					{ "text": "FT Advisor", "href": "#" },
					{ "text": "Fund Fire", "href": "#" },
					{ "text": "Global Risk Regulator", "href": "#" },
					{ "text": "How to Spend It", "href": "#" }
				]
			},
			{
				"items": [
					{ "text": "Ignites", "href": "#" },
					{ "text": "Ignites Asia", "href": "#" },
					{ "text": "Ignites Europe", "href": "#" },
					{ "text": "Investors Chronicle", "href": "#" },
					{ "text": "Mandate Wire", "href": "#" }
				]
			},
			{
				"items": [
					{ "text": "New York Insitute of Finance", "href": "#" },
					{ "text": "Non Executive Directors Club", "href": "#" },
					{ "text": "Pensions Expert", "href": "#" },
					{ "text": "Professional Wealth Management", "href": "#" },
					{ "text": "125 Club", "href": "#" }
				]
			},
			{
				"items": [
					{ "text": "The Banker", "href": "#" },
					{ "text": "The Banker Database", "href": "#" },
					{ "text": "This is Africa", "href": "#" }
				]
			}
		]
	],
	"copyrightYear": "2016",
};

module.exports = function () {
	// add an ID to each title
	let id = 0;

	data.matrix.forEach(lists => {
		lists.forEach(list => {
			list.title && id++;
			list.titleId = id;
		});
	});

	return data;
};
