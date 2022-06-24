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

export const Article: ComponentStory<typeof Teaser> = Story.bind({});
Article.args = articleArgs;
Article.argTypes = argTypes;

export const Podcast: ComponentStory<typeof Teaser> = Story.bind({});
Podcast.args = podcastArgs;
Podcast.argTypes = argTypes;

export const Opinion: ComponentStory<typeof Teaser> = Story.bind({});
Opinion.args = opinionArgs;
Opinion.argTypes = argTypes;

export const ContentPackage: ComponentStory<typeof Teaser> = Story.bind({});
ContentPackage.storyName = 'ContentPackage';
ContentPackage.args = contentPackageArgs;
ContentPackage.argTypes = argTypes;

export const PackageItem: ComponentStory<typeof Teaser> = Story.bind({});
PackageItem.storyName = 'PackageItem';
PackageItem.args = contentPackageItemArgs;
PackageItem.argTypes = argTypes;

export const Promoted: ComponentStory<typeof Teaser> = Story.bind({});
Promoted.args = promotedArgs;
Promoted.argTypes = argTypes;

export const TopStory: ComponentStory<typeof Teaser> = Story.bind({});
TopStory.storyName = 'TopStory';
TopStory.args = topStoryArgs;
TopStory.argTypes = argTypes;

export const Video = Story.bind({});
Video.args = videoArgs;
Video.argTypes = argTypes;
