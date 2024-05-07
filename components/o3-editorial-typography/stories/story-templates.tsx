import {
	Headline as HeadlineTsx,
	Body as BodyTsx,
	Detail as DetailTsx,
	Quote as QuoteTsx,
	BigNumber as BigNumberTsx,
	Byline as BylineTsx,
} from '../src/tsx/index';

import type {StoryObj, Meta} from '@storybook/react';
import type {
	HeadlineProps,
	BodyProps,
	DetailProps,
	QuoteProps,
	BigNumberProps,
	BylineProps,
} from '../src/types/index';

type HeadlineStory = Omit<StoryObj, 'args'> & {
	args: Omit<HeadlineProps, 'children'> & {content: string};
};

type BodyStory = Omit<StoryObj, 'args'> & {
	args: Omit<BodyProps, 'children'> & {content: string};
};

type DetailStory = Omit<StoryObj, 'args'> & {
	args: Omit<DetailProps, 'children'> & {content: string};
};

type QuoteStory = Omit<StoryObj, 'args'> & {
	args: Omit<QuoteProps, 'children'> & {content: string};
};

type BigNumberStory = Omit<StoryObj, 'args'> & {
	args: Omit<BigNumberProps, 'children'> & {content: string};
};

type BylineStory = Omit<StoryObj, 'args'> & {
	args: Omit<BylineProps, 'children'>;
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
		...TemplateSBConfig.argTypes,
		type: {
			options: ['small', 'large'],
			control: {
				type: 'radio',
			},
		},
	},
	render: args => {
		return <BodyTsx {...args}>{args.content}</BodyTsx>;
	},
};

const DetailTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
		type: {
			options: [
				'topic tag',
				'standfirst',
				'caption',
				'byline author',
				'byline location',
				'byline timestamp',
				'quote',
				'quote author',
			],
			mapping: {
				'topic tag': 'topic-tag',
				standfirst: 'standfirst',
				caption: 'caption',
				'byline author': 'byline-author',
				'byline location': 'byline-location',
				'byline timestamp': 'byline-timestamp',
				quote: 'quote',
				'quote author': 'quote-author',
			},
			control: {
				type: 'radio',
			},
		},
	},
	render: args => {
		return <DetailTsx {...args}>{args.content}</DetailTsx>;
	},
};

const QuoteTemplate: StoryObj = {
	argTypes: {
		...TemplateSBConfig.argTypes,
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
				<a className="o3-editorial-typography--byline-author" href="#">
					Joe Doe
				</a>
				&nbsp;
				<span className="o3-editorial-typography--location">in London</span>
				&nbsp;
				<time
					className="o3-editorial-typography--byline-timestamp"
					dateTime="2019-10-11T20:51:54Z"
					title="October 11 2019 9:51 pm">
					October 11 2019
				</time>
			</BylineTsx>
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
		type: 'small',
	},
};

export const Detail: DetailStory = {
	...DetailTemplate,
	args: {
		content: 'Detail',
		theme: 'standard',
		type: 'topic-tag',
	},
};

export const Quote: QuoteStory = {
	...QuoteTemplate,
	args: {
		content:
			'Origami is about empowering developers of all levels to build robust, on-brand products ranging from simple static sites through to rich, dynamic web applications, to do it faster, to do it cheaper, and leave them more supportable and more maintainable.',
		theme: 'standard',
		quoteAuthor: 'Quote Author',
		quoteSource: 'Quote Source',
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
