import presets from '../src/tsx/concerns/presets';
import articleData from '../demos/__fixtures__/article.json';
import podcastData from '../demos/__fixtures__/podcast.json';
import opinionData from '../demos/__fixtures__/opinion.json';
import contentPackageData from '../demos/__fixtures__/content-package.json';
import contentPackageItemData from '../demos/__fixtures__/package-item.json';
import promotedData from '../demos/__fixtures__/promoted.json';
import topStoryData from '../demos/__fixtures__/top-story.json';
import videoData from '../demos/__fixtures__/video.json';

export const articleArgs = Object.assign(articleData, presets.SmallHeavy);
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
