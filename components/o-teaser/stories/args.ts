import presets from '../src/tsx/concerns/presets';
import articleData from './__fixtures__/article.json';
import podcastData from './__fixtures__/podcast.json';
import opinionData from './__fixtures__/opinion.json';
import contentPackageData from './__fixtures__/content-package.json';
import contentPackageItemData from './__fixtures__/package-item.json';
import promotedData from './__fixtures__/promoted.json';
import topStoryData from './__fixtures__/top-story.json';
import heroImageData from './__fixtures__/hero-image.json';
import videoData from './__fixtures__/video.json';

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

export const heroImageArgs = {...heroImageData, ...Hero};
