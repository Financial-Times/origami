const data = {
	"theme": "theme-dark",
	"matrix": [
		{
			"title": "Support",
			"items": [
				{ "text": "Help", "href": "//www.ft.com/help" },
				{ "text": "About Us", "href": "//www.ft.com/aboutus" }
			]
		},
		{
			"title": "Legal & Privacy",
			"items": [
				{ "text": "Terms & Conditions", "href": "//www.ft.com/servicestools/help/terms" },
				{ "text": "Privacy", "href": "//www.ft.com/servicestools/help/privacy" },
				{ "text": "Cookies", "href": "//www.ft.com/cookiepolicy" },
				{ "text": "Copyright", "href": "//www.ft.com/servicestools/help/copyright" }
			]
		},
		{
			"title": "Services",
			"items": [
				{ "text": "Individual Subscriptions", "href": "//sub.ft.com/spa_5" },
				{ "text": "Group Subscriptions", "href": "//enterprise.ft.com/en-gb/services/group-subscriptions/" },
				{ "text": "Republishing", "href": "//enterprise.ft.com/en-gb/services/republishing/" },
				{ "text": "Contracts & Tenders", "href": "//www.businessesforsale.com/ft2/notices" },
				{ "text": "Analysts Research", "href": "//commerce.uk.reuters.com/purchase/mostPopular.do?rpc&#x3D;471" },
				{ "text": "Executive Job Search", "href": "//www.exec-appointments.com/" },
				{ "text": "Advertise with the FT", "href": "//fttoolkit.co.uk/d/", "aria-label": "Advertise with the F T" },
				{ "text": "Follow the FT on Twitter", "href": "//twitter.com/ft", "aria-label": "Follow the F T on Twitter" }
			]
		},
		{
			"title": "Tools",
			"items": [
				{ "text": "Portfolio", "href": "//markets.ft.com/data/portfolio/dashboard" },
				{ "text": "Today's Paper", "href": "//ftepaper.ft.com" },
				{ "text": "Alerts Hub", "href": "//markets.ft.com/data/alerts/" },
				{ "text": "Lexicon", "href": "//lexicon.ft.com/" },
				{ "text": "MBA Rankings", "href": "//rankings.ft.com/businessschoolrankings/global-mba-ranking-2016" },
				{ "text": "Economic Calendar", "href": "//markets.ft.com/Research/Economic-Calendar" },
				{ "text": "Newsletters", "href": "//nbe.ft.com/nbe/profile.cfm" },
				{ "text": "Currency Converter", "href": "//markets.ft.com/research/Markets/Currencies?segid&#x3D;70113" },
				{ "text": "Ebooks", "href": "//www.ft.com/ebooks", "aria-label": "E-books" }
			]
		}
	],
	"copyrightYear": (new Date()).getUTCFullYear(),
};

module.exports = function () {
	const ITEMS_PER_COLUMN = 5;

	function chunk (oldArray, size) {
		const newArray = [];

		while (oldArray.length) {
			newArray.push(oldArray.splice(0, size));
		}

		return newArray;
	}

	data.matrix.forEach((section, i) => {
		// give each section an identifier
		section.index = i;
		// calculate which section layout to use (1, 2, 4 or 6)
		section.layout = Math.ceil(section.items.length / ITEMS_PER_COLUMN);
		// split the items into equally sized chunks
		section.columns = chunk(section.items.slice(0), ITEMS_PER_COLUMN);
		// and mark it as collapsible or not
		section.collapsible = section.columns.length > 1;
	});

	return data;
};
