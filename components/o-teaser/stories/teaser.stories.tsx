import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Teaser} from '../src/tsx/teaser';
import './teaser.scss';
import {
	articleArgs,
	contentPackageArgs,
	contentPackageItemArgs,
	opinionArgs,
	podcastArgs,
	promotedArgs,
	topStoryArgs,
	videoArgs,
} from './args';

import {argTypes} from './arg-types';

export default {
	title: 'Components/o-teaser',
	component: Teaser,
	decorators: [withDesign, withHtml],
	parameters: {},
} as ComponentMeta<typeof Teaser>;

const Story: ComponentStory<typeof Teaser> = args => {
	return <Teaser {...args} />;
};

const controlsToExclude = [
	'relatedLinks',
	'video',
	'headshot',
	'imageLazyLoad',
	'parentId',
	'parentLabel',
	'headlineTesting',
	'promotedSuffixText',
	'promotedPrefixText',
	'relativeUrl',
	'showCustomSlot',
	'customSlot',
	'showRelatedLinks',
	'showVideo',
	'showHeadshot',
];

export const Article: ComponentStory<typeof Teaser> = Story.bind({});
Article.args = articleArgs;
Article.argTypes = argTypes;
Article.parameters = {controls: {exclude: controlsToExclude}};

export const Podcast: ComponentStory<typeof Teaser> = Story.bind({});
Podcast.args = podcastArgs;
Podcast.argTypes = argTypes;
Podcast.parameters = {
	controls: {exclude: [...controlsToExclude, 'metaPrefixText', 'altTitle']},
};

export const Opinion: ComponentStory<typeof Teaser> = Story.bind({});
Opinion.args = opinionArgs;
Opinion.argTypes = argTypes;

Opinion.parameters = {
	controls: {
		exclude: subtractArrays(controlsToExclude, ['showHeadshot', 'headshot']),
	},
};

export const ContentPackage: ComponentStory<typeof Teaser> = Story.bind({});
ContentPackage.storyName = 'ContentPackage';
ContentPackage.args = contentPackageArgs;
ContentPackage.argTypes = argTypes;
ContentPackage.parameters = {
	controls: {exclude: [...controlsToExclude, 'showStandfirst', 'indicators']},
};

export const PackageItem: ComponentStory<typeof Teaser> = Story.bind({});
PackageItem.storyName = 'PackageItem';
PackageItem.args = contentPackageItemArgs;
PackageItem.argTypes = argTypes;
PackageItem.parameters = {
	controls: {
		exclude: [
			...controlsToExclude,
			'showStandfirst',
			'metaAltLink',
			'altTitle',
			'altStandfirst',
		],
	},
};

export const Promoted: ComponentStory<typeof Teaser> = Story.bind({});
Promoted.args = promotedArgs;
Promoted.argTypes = argTypes;
const promotedUnusedControls = subtractArrays(
	[
		...controlsToExclude,
		'indicators',
		'metaPrefixText',
		'metaSuffixText',
		'metaLink',
		'metaAltLink',
		'altTitle',
		'altStandfirst',
	],
	['promotedPrefixText', 'promotedSuffixText']
);
Promoted.parameters = {controls: {exclude: promotedUnusedControls}};

export const TopStory: ComponentStory<typeof Teaser> = Story.bind({});
TopStory.storyName = 'TopStory';
TopStory.args = topStoryArgs;
TopStory.argTypes = argTypes;
const topStoryUnusedControls = subtractArrays(
	[...controlsToExclude, 'indicators'],
	['relatedLinks', 'showRelatedLinks']
);
TopStory.parameters = {controls: {exclude: topStoryUnusedControls}};

export const Video: ComponentStory<typeof Teaser> = Story.bind({});
Video.args = videoArgs;
Video.argTypes = argTypes;
const videoUnusedControls = subtractArrays(
	[
		...controlsToExclude,
		'showStandfirst',
		'showStatus',
		'showImage',
		'indicators',
		'altTitle',
		'altStandfirst',
	],
	['video', 'showVideo']
);
Video.parameters = {controls: {exclude: videoUnusedControls}};

function subtractArrays(a: string[], b: string[]) {
	return a.filter(x => !b.includes(x));
}
