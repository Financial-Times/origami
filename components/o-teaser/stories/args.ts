import {TeaserProps} from '../src/tsx/prop-types';
import presets from '../src/tsx/concerns/presets';
import articleData from '../demos/__fixtures__/article.json';
import podcastData from '../demos/__fixtures__/podcast.json';
import opinionData from '../demos/__fixtures__/opinion.json';
import contentPackageData from '../demos/__fixtures__/content-package.json';
import contentPackageItemData from '../demos/__fixtures__/package-item.json';
import promotedData from '../demos/__fixtures__/promoted.json';
import topStoryData from '../demos/__fixtures__/top-story.json';
import videoData from '../demos/__fixtures__/video.json';

// export const articleArgs = Object.assign(articleData, presets.SmallHeavy);
export const articleArgs = {
	...presets.SmallHeavy,
	type: 'article',
	id: '',
	url: '#',
	title: 'Inside charity fundraiser where hostesses are put on show',
	altTitle: 'Men Only, the charity fundraiser with hostesses on show',
	standfirst:
		'FT investigation finds groping and sexual harassment at secretive black-tie dinner',
	altStandfirst:
		'Groping and sexual harassment at black-tie dinner charity event',
	publishedDate: '2018-01-23T15:07:00.000Z',
	firstPublishedDate: '2018-01-23T13:53:00.000Z',
	metaPrefixText: '',
	metaSuffixText: '',
	metaLink: {
		url: '#',
		prefLabel: 'Sexual misconduct allegations',
	},
	metaAltLink: {
		url: '#',
		prefLabel: 'FT Investigations',
	},
	image: {
		url: 'http://prod-upp-image-read.ft.com/a25832ea-0053-11e8-9650-9c0ad2d7c5b5',
		width: 2048,
		height: 1152,
	},
	indicators: {
		isEditorsChoice: true,
	},
	status: '',
	headshotTint: '',
	accessLevel: 'free',
	theme: '',
	parentTheme: '',
	modifiers: '',
};
export const podcastArgs = Object.assign(podcastData, presets.SmallHeavy);
export const opinionArgs = Object.assign(opinionData, presets.SmallHeavy, {
	showHeadshot: true,
});
export const contentPackageArgs = Object.assign(
	contentPackageData,
	presets.Hero
);
export const contentPackageItemArgs = Object.assign(
	contentPackageItemData,
	presets.Hero
);
export const promotedArgs = Object.assign(promotedData, presets.SmallHeavy);
export const topStoryArgs = Object.assign(
	topStoryData,
	presets.TopStoryLandscape
);
export const videoArgs = Object.assign(videoData, presets.HeroVideo);
