import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Teaser} from '../src/tsx/teaser';

import './teaser.scss';


// Include o3 foundation. This makes our demos replicate the setup teams that have migrated to O3 have/
import '@financial-times/o3-foundation/css/core.css';
import '@financial-times/o3-foundation/css/professional.css';
import '@financial-times/o3-foundation/css/internal.css';
import '@financial-times/o3-foundation/css/sustainable-views.css';
import '@financial-times/o3-foundation/css/whitelabel.css';

import {
	articleArgs,
	contentPackageArgs,
	contentPackageItemArgs,
	opinionArgs,
	podcastArgs,
	promotedArgs,
	topStoryArgs,
	videoArgs,
	heroImageArgs
} from './args';

import {argTypes} from './arg-types';

argTypes.customSlot = {
	type: 'string',
};

export default {
	title: 'Maintained/o-teaser',
	component: Teaser,
	parameters: {},
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
} as ComponentMeta<typeof Teaser>;

const Story: ComponentStory<typeof Teaser> = args => {
	if (args.showCustomSlot) {
		const parsedElement = parse(DOMPurify.sanitize(args.customSlot));
		args.customSlot = parsedElement;
	}
	return <Teaser {...args} />;
};

export const Article: ComponentStory<typeof Teaser> = Story.bind({});
Article.args = articleArgs;
Article.argTypes = argTypes;
Article.parameters = {
	controls: {
		exclude: [
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
		],
	},
};

export const Podcast: ComponentStory<typeof Teaser> = Story.bind({});
Podcast.args = podcastArgs;
Podcast.argTypes = argTypes;
Podcast.parameters = {
	controls: {
		exclude: [
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
			'metaPrefixText',
			'altTitle',
		],
	},
};

export const Opinion: ComponentStory<typeof Teaser> = Story.bind({});
Opinion.args = opinionArgs;
Opinion.argTypes = argTypes;

Opinion.parameters = {
	controls: {
		exclude: [
			'relatedLinks',
			'video',
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
		],
	},
};

export const ContentPackage: ComponentStory<typeof Teaser> = Story.bind({});
ContentPackage.storyName = 'ContentPackage';
ContentPackage.args = contentPackageArgs;
ContentPackage.argTypes = argTypes;
ContentPackage.parameters = {
	controls: {
		exclude: [
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
			'showStandfirst',
			'indicators',
		],
	},
};

export const PackageItem: ComponentStory<typeof Teaser> = Story.bind({});
PackageItem.storyName = 'PackageItem';
PackageItem.args = contentPackageItemArgs;
PackageItem.argTypes = argTypes;
PackageItem.parameters = {
	controls: {
		exclude: [
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
Promoted.parameters = {
	controls: {
		exclude: [
			'relatedLinks',
			'video',
			'headshot',
			'imageLazyLoad',
			'parentId',
			'parentLabel',
			'headlineTesting',
			'relativeUrl',
			'showCustomSlot',
			'customSlot',
			'showRelatedLinks',
			'showVideo',
			'showHeadshot',
			'indicators',
			'metaPrefixText',
			'metaSuffixText',
			'metaLink',
			'metaAltLink',
			'altTitle',
			'altStandfirst',
		],
	},
};

export const TopStory: ComponentStory<typeof Teaser> = Story.bind({});
TopStory.storyName = 'TopStory';
TopStory.args = topStoryArgs;
TopStory.argTypes = argTypes;
TopStory.parameters = {
	controls: {
		exclude: [
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
			'showVideo',
			'showHeadshot',
			'indicators',
		],
	},
};

export const Video: ComponentStory<typeof Teaser> = Story.bind({});
Video.args = videoArgs;
Video.argTypes = argTypes;
Video.parameters = {
	controls: {
		exclude: [
			'relatedLinks',
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
			'showHeadshot',
			'showStandfirst',
			'showStatus',
			'showImage',
			'indicators',
			'altTitle',
			'altStandfirst',
		],
	},
};

export const HeroImage: ComponentStory<typeof Teaser> = Story.bind({});
HeroImage.args = heroImageArgs;
HeroImage.argTypes = argTypes;
HeroImage.parameters = {
	controls: {
		exclude: [
			'relatedLinks',
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
			'showHeadshot',
			'showStandfirst',
			'showStatus',
			'showImage',
			'indicators',
			'altTitle',
			'altStandfirst',
		],
	},
};
