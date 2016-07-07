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
				{ "text": "Advertise with the FT", "href": "//fttoolkit.co.uk/d/" },
				{ "text": "Follow the FT on Twitter", "href": "//twitter.com/ft" }
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
				{ "text": "Newsfeed", "href": "#" },
				{ "text": "Newsletters", "href": "//nbe.ft.com/nbe/profile.cfm" },
				{ "text": "Currency Converter", "href": "//markets.ft.com/research/Markets/Currencies?segid&#x3D;70113" },
				{ "text": "Ebooks", "href": "#" }
			]
		},
		{
			"title": "More from FT Group",
			"items": [
				{ "text": "Agenda", "href": "//www.agendaweek.com/" },
				{ "text": "Analyse Africa", "href": "//www.analyseafrica.com/" },
				{ "text": "Board IQ", "href": "//www.boardiq.com/" },
				{ "text": "Corporate Learning Alliance", "href": "//www.ftiecla.com/" },
				{ "text": "DPN: Deutsche Pensions & Investment Nachrichten", "href": "//www.dpn-online.com/" },
				{ "text": "ExecSense", "href": "//www.execsense.com/" },
				{ "text": "FDI Intelligence", "href": "//www.fdiintelligence.com/" },
				{ "text": "Financial Advisor IQ", "href": "//financialadvisoriq.com/" },
				{ "text": "FT Chinese", "href": "//www.ftchinese.com/" },
				{ "text": "FT Live", "href": "//live.ft.com/" },
				{ "text": "FT Property Listings", "href": "//propertylistings.ft.com/" },
				{ "text": "FT Advisor", "href": "//www.ftadviser.com/" },
				{ "text": "Fund Fire", "href": "//www.fundfire.com/" },
				{ "text": "Global Risk Regulator", "href": "//www.globalriskregulator.com/" },
				{ "text": "How to Spend It", "href": "//howtospendit.ft.com/" },
				{ "text": "Ignites", "href": "//www.ignites.com/" },
				{ "text": "Ignites Asia", "href": "//www.ignitesasia.com/" },
				{ "text": "Ignites Europe", "href": "//www.igniteseurope.com/" },
				{ "text": "Investors Chronicle", "href": "//www.investorschronicle.co.uk/" },
				{ "text": "Mandate Wire", "href": "//www.mandatewire.com/" },
				{ "text": "New York Insitute of Finance", "href": "//www.nyif.com/" },
				{ "text": "Non Executive Directors Club", "href": "//www.non-execs.com/" },
				{ "text": "Pensions Expert", "href": "//www.pensions-expert.com/" },
				{ "text": "Professional Wealth Management", "href": "//www.pwmnet.com/" },
				{ "text": "125 Club", "href": "//the125.ft.com/" },
				{ "text": "The Banker", "href": "//www.thebanker.com/" },
				{ "text": "The Banker Database", "href": "//www.thebankerdatabase.com/" },
				{ "text": "This is Africa", "href": "//www.thisisafricaonline.com/" }
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
