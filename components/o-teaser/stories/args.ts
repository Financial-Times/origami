import presets from '../src/tsx/concerns/presets';
import articleData from '../demos/__fixtures__/article.json';
import podcastData from '../demos/__fixtures__/podcast.json';
import opinionData from '../demos/__fixtures__/opinion.json';
import contentPackageData from '../demos/__fixtures__/content-package.json';
import contentPackageItemData from '../demos/__fixtures__/package-item.json';
import promotedData from '../demos/__fixtures__/promoted.json';
import topStoryData from '../demos/__fixtures__/top-story.json';
import videoData from '../demos/__fixtures__/video.json';

const {SmallHeavy, Hero, TopStoryLandscape, HeroVideo} = presets;

export const articleArgs = {...articleData, ...SmallHeavy};
export const podcastArgs = {...podcastData, ...SmallHeavy};
export const opinionArgs = {...opinionData, ...SmallHeavy, showHeadshot: true};
export const contentPackageArgs = {
	...contentPackageData,
	...Hero,
};
export const contentPackageItemArgs = {
	...contentPackageItemData,
	...Hero,
};
export const promotedArgs = {...promotedData, ...SmallHeavy};
export const topStoryArgs = {
	...topStoryData,
	...TopStoryLandscape,
};
export const videoArgs = {...videoData, ...HeroVideo};
