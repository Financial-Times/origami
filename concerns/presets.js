import { Layouts } from './constants';

const Small = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStatus: true
};

const SmallHeavy = {
	layout: Layouts.Small,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Small'
};

const Large = {
	layout: Layouts.Large,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium'
};

const Hero = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStatus: true,
	showImage: true,
	imageSize: 'Medium'
};

const HeroNarrow = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true
};

const HeroVideo = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showVideo: true,
	imageSize: 'Large'
};

const HeroOverlay = {
	layout: Layouts.Hero,
	showMeta: true,
	showTitle: true,
	showStatus: true,
	showImage: true,
	imageSize: 'XL',
	modifiers: ['hero-image']
};

const TopStory = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showRelatedLinks: true
};

const TopStoryLandscape = {
	layout: Layouts.TopStory,
	showMeta: true,
	showTitle: true,
	showStandfirst: true,
	showStatus: true,
	showImage: true,
	imageSize: 'XL',
	showRelatedLinks: true,
	modifiers: ['landscape']
};

export default {
	Small,
	SmallHeavy,
	Large,
	Hero,
	HeroNarrow,
	HeroVideo,
	HeroOverlay,
	TopStory,
	TopStoryLandscape
};
