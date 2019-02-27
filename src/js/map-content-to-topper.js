const themeImageRatio = {
	'split-text-center': 'split',
	'split-text-left': 'split',
	'full-bleed-image-center': 'full-bleed',
	'full-bleed-image-left': 'full-bleed',
	'full-bleed-offset': 'full-bleed'
};

const isNews = content => content.annotations && content.annotations.find(a => a.prefLabel === 'News');

const getTopperSettings = content => {
	content.topper = content.topper || {};
	//live blogs and news packages
	if (content.realtime && content.liveBlog ||
		content.package && isNews(content.package) && content.package.contains[0].id === content.id ||
		content.type === 'package' && isNews(content)) {

		const designTheme = content.package && content.package.design.theme || content.design && content.design.theme;
		const isStandaloneLiveBlog = !content.package && content.realtime && content.liveBlog;

		const isLoud = designTheme === 'extra' || isStandaloneLiveBlog;

		return {
			layout: null,
			backgroundColour: isLoud ? 'crimson' : 'wheat',
			modifiers: ['news-package'],
			themeImageRatio: 'split',
			includesImage: true,
			isExperimental: true,
		};


	//Articles within a package get a slate offset topper if the package has the 'extra' theme
	} else if (content.containedIn && content.containedIn.length && content.package && content.package.design.theme.includes('extra') && !isNews(content.package)) {
		return {
			layout: 'full-bleed-offset',
			largeHeadline: true,
			backgroundColour: 'slate',
			modifiers: ['full-bleed-offset', 'package-extra'],
			includesImage: true
		};

	//package landing pages
	} else if (content.type === 'package' && content.design && content.design.theme) {
		const themeMap = {
			'basic': {
				bgColour: 'wheat',
				layout: 'split-text-left',
				largeHeadline: true
			},
			'special-report': {
				bgColour: 'claret',
				layout: 'split-text-left',
				largeHeadline: true
			},
			'extra': {
				bgColour: 'slate',
				layout: 'split-text-left',
				largeHeadline: true
			},
			'extra-wide': {
				bgColour: 'slate',
				layout: 'split-text-left',
				largeHeadline: true
			}
		};

		const selectedTheme = themeMap[content.design.theme];
		const modifiers = [selectedTheme.layout, 'package', `package-${content.design.theme}`];

		return {
			layout: selectedTheme.layout,
			largeHeadline: selectedTheme.largeHeadline,
			backgroundColour: selectedTheme.bgColour,
			modifiers,
			includesImage: true
		};

		//otherwise use the editorially selected topper if it exists
	} else if(content.topper && content.topper.layout && themeImageRatio.hasOwnProperty(content.topper.layout)) {
		const hasImage = content.topper.layout !== 'full-bleed-text';
		let backgroundColour;

		//converts old palette colours to new palette colours from Methode
		if (content.topper.layout === 'full-bleed-offset') {
			backgroundColour = 'paper';
		} else if (content.topper.backgroundColour === 'pink') {
			backgroundColour = 'paper';
		} else if (content.topper.backgroundColour === 'blue') {
			backgroundColour = 'oxford';
		} else {
			backgroundColour = content.topper.backgroundColour || 'paper';
		}

		return {
			layout: content.topper.layout,
			largeHeadline: true,
			backgroundColour,
			modifiers: [content.topper.layout],
			includesImage: hasImage
		};

		//Branded regular toppers
	} else if(content.brandConcept || (content.topper && content.topper.isBranded) || (content.genreConcept && content.genreConcept.id === '6da31a37-691f-4908-896f-2829ebe2309e')) {
		let fthead = Array.isArray(content.authorConcepts) &&
			content.authorConcepts.reduce(
				(attrs, {attributes} = {}) => attrs.concat(attributes),
				[]
			).find(
				({key} = {}) => key === 'headshot'
			);

		fthead = fthead ? fthead.value : '';
		const modifiers = fthead ? ['branded', 'has-headshot'] : ['branded'];

		let backgroundColour;
		let headshotTint;
		let isOpinion = false;

		if(content.genreConcept && content.genreConcept.id === '6da31a37-691f-4908-896f-2829ebe2309e') { // opinion
			backgroundColour = content.containedIn && content.containedIn.length ? 'wheat' : 'sky';
			modifiers.push('opinion');
			headshotTint = '054593,d6d5d3';
			isOpinion = true;
		} else {
			backgroundColour = 'wheat';
		}

		if (content.topper && content.topper.backgroundColour) {
			backgroundColour = content.topper.backgroundColour;
		}

		return {
			layout: 'branded',
			backgroundColour,
			includesTeaser: true,
			modifiers,
			isOpinion,
			headshotTint,
			fthead,
		};

	//everything else gets a regular topper
	} else {
		return {
			layout: null,
			backgroundColour: 'paper',
			includesTeaser: true,
			modifiers: ['basic'],
		};
	}
};

const hasDarkBackground = (backgroundColour) => {
	const darkBackgrounds = [
		'black',
		'slate',
		'oxford',
		'claret',
		'crimson'
	];
	return (darkBackgrounds.indexOf(backgroundColour) > -1);
};

module.exports = content => {
	const topper = content.topper || {};
	const settings = getTopperSettings(content);
	return Object.assign({},
		topper,
		{
			headline: topper.headline || content.title,
			standfirst: content.descriptionHTML || topper.standfirst || content.standfirst,
			themeImageRatio: themeImageRatio[settings.layout]
		},
		settings,
		{ hasDarkBackground: hasDarkBackground(settings.backgroundColour) });
};
