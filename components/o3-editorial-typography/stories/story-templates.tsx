import {
	Heading as HeadingTsx,
	Summary as SummaryTsx,
	StandFirst as StandFirstTsx,
	Caption as CaptionTsx,
	TopicTag as TopicTagTsx,
	Quote as QuoteTsx,
	BigNumber as BigNumberTsx,
	Byline as BylineTsx,
	List as ListTsx,
} from '../src/tsx/index';

import type {StoryObj, Meta} from '@storybook/react';
import type {
	HeadingProps,
	SummaryProps,
	QuoteProps,
	BigNumberProps,
	BylineProps,
	DetailProps,
	TopicTagProps,
} from '../src/types';

type StoryObjNoArgs = Omit<StoryObj, 'args'>;

type Headings = StoryObjNoArgs & {
	args: Omit<HeadingProps, 'children'> & {content: string};
};

type SummaryStory = StoryObjNoArgs & {
	args: Omit<SummaryProps, 'children'> & {content: string};
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
	args: Omit<BylineProps, 'children'> & {brand?: string};
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
	parameters: {
		design: {
			type: 'figma',
		},
	},
	tags: ['autodocs', 'core', 'professional', 'whitelabel', 'sustainable-views'],
};

const HeadingTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
		type: {
			options: ['display', 'headline', 'subheading', 'chapter', 'label'],
			control: {
				type: 'radio',
			},
		},
		underline: {
			control: {
				type: 'boolean',
			},
			if: {arg: 'type', eq: 'display'},
		},
	},
	tags: [...TemplateSBConfig.tags],
	render: args => {
		return <HeadingTsx {...args}>{args.content}</HeadingTsx>;
	},
};

const SummaryTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	tags: [...TemplateSBConfig.tags],
	render: args => {
		return <SummaryTsx {...args}>{args.content}</SummaryTsx>;
	},
};

const StandFirstTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	tags: [...TemplateSBConfig.tags],
	render: args => {
		return <StandFirstTsx {...args}>{args.content}</StandFirstTsx>;
	},
};

const CaptionTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	tags: [...TemplateSBConfig.tags],
	render: args => {
		return (
			<figure>
				<img
					alt="Image caption demo"
					src="https://images.ft.com/v3/image/raw/https%3A%2F%2Fim.ft-static.com%2Fcontent%2Fimages%2Fa60ae24b-b87f-439c-bf1b-6e54946b4cf2.img?width=250&amp;source=origami"
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
	tags: [...TemplateSBConfig.tags],
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
		quoteSource: {
			control: {
				type: 'text',
				placeholder: 'Quote source',
			},
			if: {arg: 'type', eq: 'block'},
		},
	},
	parameters: {
		controls: {exclude: ['type', 'children']},
	},
	tags: [...TemplateSBConfig.tags],
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
	tags: [...TemplateSBConfig.tags],
	render: args => {
		return <BigNumberTsx {...args}>{args.content}</BigNumberTsx>;
	},
};

const BylineTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
	},
	parameters: {
		controls: {exclude: ['type', 'children', 'brand']},
	},
	tags: [...TemplateSBConfig.tags],
	render: args => {
		return (
			<BylineTsx {...args}>
				<a className="o3-editorial-typography-byline-author" href="#">
					Joe Doe
				</a>
				{''} in London {''}
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
	tags: [...TemplateSBConfig.tags],
	render: args => {
		return (
			<div id="component-wrapper" style={{padding: '20px'}}>
				<ListTsx {...args} />
			</div>
		);
	},
};

export const Heading: Headings = {
	...HeadingTemplate,
	args: {
		content: 'Don’t settle for black and white',
		theme: 'standard',
		type: 'display',
		underline: true,
	},
};

export const Summary: SummaryStory = {
	...SummaryTemplate,
	args: {
		content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
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
		type: 'pull',
		theme: 'standard',
		quoteAuthor: 'Quote Author',
		quoteSource: 'Quote Source',
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
