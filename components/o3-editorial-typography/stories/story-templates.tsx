import {
	Headline as HeadlineTsx,
	Body as BodyTsx,
	Caption as CaptionTsx,
	StandFirst as StandFirstTsx,
	TopicTag as TopicTagTsx,
	Quote as QuoteTsx,
	BigNumber as BigNumberTsx,
	Byline as BylineTsx,
	List as ListTsx,
	Link as LinkTsx,
} from '../src/tsx/index';

import type {StoryObj, Meta} from '@storybook/react';
import type {
	HeadlineProps,
	BodyProps,
	QuoteProps,
	BigNumberProps,
	BylineProps,
	DetailProps,
	TopicTagProps,
	LinkProps,
} from '../src/types/index';

type StoryObjNoArgs = Omit<StoryObj, 'args'>;

type HeadlineStory = StoryObjNoArgs & {
	args: Omit<HeadlineProps, 'children'> & {content: string};
};

type BodyStory = StoryObjNoArgs & {
	args: Omit<BodyProps, 'children'> & {content: string};
};

type DetailStory = StoryObjNoArgs & {
	args: Omit<DetailProps, 'children'> & {content: string};
};

type TopicTagStory = StoryObjNoArgs & {
	args: Omit<TopicTagProps, 'children'> & {content: string};
};

type QuoteStory = StoryObjNoArgs & {
	args: Omit<QuoteProps, 'children'> & {content: string};
};

type BigNumberStory = StoryObjNoArgs & {
	args: Omit<BigNumberProps, 'children'> & {content: string};
};

type BylineStory = StoryObjNoArgs & {
	args: Omit<BylineProps, 'children'>;
};

type LinkStory = StoryObjNoArgs & {
	args: Omit<LinkProps, 'children' | 'anchorAttributes'> & {
		content: string;
		openInNewTab: boolean;
	};
};

const TemplateSBConfig: Meta = {
	argTypes: {
		theme: {
			options: ['standard', 'inverse'],
			control: {
				type: 'radio',
			},
		},
	},
};

const HeadlineTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
		type: {
			options: ['headline-large', 'headline', 'subheading', 'chapter', 'label'],
			control: {
				type: 'radio',
			},
		},
		underline: {
			control: {
				type: 'boolean',
			},
			if: {arg: 'type', eq: 'headline-large'},
		},
	},
	render: args => {
		return <HeadlineTsx {...args}>{args.content}</HeadlineTsx>;
	},
};

const BodyTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes
	},
	render: args => {
		return <BodyTsx {...args}>{args.content}</BodyTsx>;
	},
};

const StandFirstTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	render: args => {
		return <StandFirstTsx {...args}>{args.content}</StandFirstTsx>;
	},
};

const CaptionTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	render: args => {
		return (
			<figure>
				<img
					alt="Image caption demo"
					src="https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2Fa60ae24b-b87f-439c-bf1b-6e54946b4cf2.img?width=250&amp;source=origami-build-tools"
				/>
				<CaptionTsx {...args}>{args.content}</CaptionTsx>
			</figure>
		);
	},
};

const TopicTagTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	render: args => {
		return <TopicTagTsx {...args}>{args.content}</TopicTagTsx>;
	},
};

const QuoteTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
		type: {
			options: ['block', 'pull'],
			control: {
				type: 'radio',
			},
		},
	},
	parameters: {
		controls: {exclude: ['type', 'children']},
	},
	render: args => {
		return <QuoteTsx {...args}>{args.content}</QuoteTsx>;
	},
};

const BigNumberTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	parameters: {
		controls: {exclude: ['type', 'children']},
	},
	render: args => {
		return <BigNumberTsx {...args}>{args.content}</BigNumberTsx>;
	},
};

const BylineTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	parameters: {
		controls: {exclude: ['type', 'children']},
	},
	render: args => {
		return (
			<BylineTsx {...args}>
				<a className="o3-editorial-typography-byline-author" href="#">
					Joe Doe
				</a>
				&nbsp;
				<span className="o3-editorial-typography-byline-location">
					in London
				</span>
				&nbsp;
				<time
					className="o3-editorial-typography-byline-timestamp"
					dateTime="2019-10-11T20:51:54Z"
					title="October 11 2019 9:51 pm">
					October 11 2019
				</time>
			</BylineTsx>
		);
	},
};

const ListTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
		type: {
			options: ['ordered', 'unordered'],
			control: {
				type: 'radio',
			},
		},
	},
	render: args => {
		return (
			<div id="component-wrapper" style={{padding: '20px'}}>
				<BodyTsx>
					<ListTsx {...args} />
				</BodyTsx>
			</div>
		);
	},
};

const LinkTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
		openInNewTab: {
			control: {
				type: 'boolean',
			},
		},
	},
	render: args => {
		if (args.openInNewTab) {
			args.anchorTarget = '_blank'
		}
		return (
			<BodyTsx>
				<span>
					We have a &nbsp;
					<LinkTsx {...args}>{args.content}</LinkTsx>
					&nbsp; style. Links may open in a new window/tab but we &nbsp;
					<LinkTsx {...args} anchorTarget="_blank">
						recommend against it
					</LinkTsx>
					&nbsp; in most cases.
				</span>
			</BodyTsx>
		);
	},
};
export const Heading: HeadlineStory = {
	...HeadlineTemplate,
	args: {
		content: 'Don’t settle for black and white',
		theme: 'standard',
		type: 'headline-large',
		underline: true,
	},
};

export const Body: BodyStory = {
	...BodyTemplate,
	args: {
		content: 'Body',
		theme: 'standard',
	},
};

export const StandFirst: DetailStory = {
	...StandFirstTemplate,
	args: {
		content: 'StandFirst',
		theme: 'standard',
	},
};

export const Caption: DetailStory = {
	...CaptionTemplate,
	args: {
		content: '© Lorem John Doe',
		theme: 'standard',
	},
};

export const TopicTag: TopicTagStory = {
	...TopicTagTemplate,
	args: {
		content: 'Topic Tag',
		theme: 'standard',
		href: '#',
	},
};

export const Quote: QuoteStory = {
	...QuoteTemplate,
	args: {
		content:
			'Origami is about empowering developers of all levels to build robust, on-brand products ranging from simple static sites through to rich, dynamic web applications, to do it faster, to do it cheaper, and leave them more supportable and more maintainable.',
		type: 'block',
		theme: 'standard',
		quoteAuthor: 'Quote Author',
		quoteCaption: 'Quote Source',
		quoteIcon: true,
	},
};

export const BigNumber: BigNumberStory = {
	...BigNumberTemplate,
	args: {
		content: 'Cost expected to increase by £13.7m a year.',
		theme: 'standard',
		title: '£27,5m',
	},
};

export const Byline: BylineStory = {
	...BylineTemplate,
	args: {
		theme: 'standard',
	},
};

export const List: StoryObj = {
	...ListTemplate,
	args: {
		theme: 'standard',
		type: 'ordered',
		listItems: [
			'Lorem ipsum adipiscing elit.',
			'Sed feugiat turpis at massa tristique.',
			'Curabitu r accumsan elit luctus.',
		],
	},
};

export const Link: LinkStory = {
	...LinkTemplate,
	args: {
		content: 'standard link',
		theme: 'standard',
		openInNewTab: false,
		href: 'https://origami.ft.com',
	},
};
