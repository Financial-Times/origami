import parse from "html-react-parser"
import DOMPurify from "dompurify"

import {StoryObj, StoryFn, Meta} from "@storybook/react"
import {Teaser} from "../src/tsx/teaser"
import "./teaser.scss"
import {
	articleArgs,
	contentPackageArgs,
	contentPackageItemArgs,
	opinionArgs,
	podcastArgs,
	promotedArgs,
	topStoryArgs,
	videoArgs,
} from "./args"

import {argTypes} from "./arg-types"

argTypes.customSlot = {
	type: "string",
}

export default {
	title: "Components/o-teaser",
	component: Teaser,
	parameters: {},
} as Meta<typeof Teaser>

const Story: StoryFn<typeof Teaser> = args => {
	if (args.showCustomSlot) {
		const parsedElement = parse(DOMPurify.sanitize(args.customSlot))
		args.customSlot = parsedElement
	}
	return <Teaser {...args} />
}

export const Article: StoryObj<typeof Teaser> = {
	render: Story,
	args: articleArgs,
	argTypes: argTypes,

	parameters: {
		controls: {
			exclude: [
				"relatedLinks",
				"video",
				"headshot",
				"imageLazyLoad",
				"parentId",
				"parentLabel",
				"headlineTesting",
				"promotedSuffixText",
				"promotedPrefixText",
				"relativeUrl",
				"showCustomSlot",
				"customSlot",
				"showRelatedLinks",
				"showVideo",
				"showHeadshot",
			],
		},
	},
}

export const Podcast: StoryObj<typeof Teaser> = {
	render: Story,
	args: podcastArgs,
	argTypes: argTypes,

	parameters: {
		controls: {
			exclude: [
				"relatedLinks",
				"video",
				"headshot",
				"imageLazyLoad",
				"parentId",
				"parentLabel",
				"headlineTesting",
				"promotedSuffixText",
				"promotedPrefixText",
				"relativeUrl",
				"showCustomSlot",
				"customSlot",
				"showRelatedLinks",
				"showVideo",
				"showHeadshot",
				"metaPrefixText",
				"altTitle",
			],
		},
	},
}

export const Opinion: StoryObj<typeof Teaser> = {
	render: Story,
	args: opinionArgs,
	argTypes: argTypes,

	parameters: {
		controls: {
			exclude: [
				"relatedLinks",
				"video",
				"imageLazyLoad",
				"parentId",
				"parentLabel",
				"headlineTesting",
				"promotedSuffixText",
				"promotedPrefixText",
				"relativeUrl",
				"showCustomSlot",
				"customSlot",
				"showRelatedLinks",
				"showVideo",
			],
		},
	},
}

export const ContentPackage: StoryObj<typeof Teaser> = {
	render: Story,
	name: "ContentPackage",
	args: contentPackageArgs,
	argTypes: argTypes,

	parameters: {
		controls: {
			exclude: [
				"relatedLinks",
				"video",
				"headshot",
				"imageLazyLoad",
				"parentId",
				"parentLabel",
				"headlineTesting",
				"promotedSuffixText",
				"promotedPrefixText",
				"relativeUrl",
				"showCustomSlot",
				"customSlot",
				"showRelatedLinks",
				"showVideo",
				"showHeadshot",
				"showStandfirst",
				"indicators",
			],
		},
	},
}

export const PackageItem: StoryObj<typeof Teaser> = {
	render: Story,
	name: "PackageItem",
	args: contentPackageItemArgs,
	argTypes: argTypes,

	parameters: {
		controls: {
			exclude: [
				"relatedLinks",
				"video",
				"headshot",
				"imageLazyLoad",
				"parentId",
				"parentLabel",
				"headlineTesting",
				"promotedSuffixText",
				"promotedPrefixText",
				"relativeUrl",
				"showCustomSlot",
				"customSlot",
				"showRelatedLinks",
				"showVideo",
				"showHeadshot",
				"showStandfirst",
				"metaAltLink",
				"altTitle",
				"altStandfirst",
			],
		},
	},
}

export const Promoted: StoryObj<typeof Teaser> = {
	render: Story,
	args: promotedArgs,
	argTypes: argTypes,

	parameters: {
		controls: {
			exclude: [
				"relatedLinks",
				"video",
				"headshot",
				"imageLazyLoad",
				"parentId",
				"parentLabel",
				"headlineTesting",
				"relativeUrl",
				"showCustomSlot",
				"customSlot",
				"showRelatedLinks",
				"showVideo",
				"showHeadshot",
				"indicators",
				"metaPrefixText",
				"metaSuffixText",
				"metaLink",
				"metaAltLink",
				"altTitle",
				"altStandfirst",
			],
		},
	},
}

export const TopStory: StoryObj<typeof Teaser> = {
	render: Story,
	name: "TopStory",
	args: topStoryArgs,
	argTypes: argTypes,

	parameters: {
		controls: {
			exclude: [
				"video",
				"headshot",
				"imageLazyLoad",
				"parentId",
				"parentLabel",
				"headlineTesting",
				"promotedSuffixText",
				"promotedPrefixText",
				"relativeUrl",
				"showCustomSlot",
				"customSlot",
				"showVideo",
				"showHeadshot",
				"indicators",
			],
		},
	},
}

export const Video: StoryObj<typeof Teaser> = {
	render: Story,
	args: videoArgs,
	argTypes: argTypes,

	parameters: {
		controls: {
			exclude: [
				"relatedLinks",
				"headshot",
				"imageLazyLoad",
				"parentId",
				"parentLabel",
				"headlineTesting",
				"promotedSuffixText",
				"promotedPrefixText",
				"relativeUrl",
				"showCustomSlot",
				"customSlot",
				"showRelatedLinks",
				"showHeadshot",
				"showStandfirst",
				"showStatus",
				"showImage",
				"indicators",
				"altTitle",
				"altStandfirst",
			],
		},
	},
}
