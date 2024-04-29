import {Headline as HeadlineTsx, Body as BodyTsx} from '../src/tsx/index';

import type {StoryObj} from '@storybook/react';
import type {HeadlineProps, BodyProps} from '../src/types/index';

type HeadlineStory = Omit<StoryObj, 'args'> & {
	args: Omit<HeadlineProps, 'children'> & {content: string};
};

type BodyStory = Omit<StoryObj, 'args'> & {
	args: Omit<BodyProps, 'children'> & {content: string};
};

const TemplateSBConfig = {
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
			options: ['headline large', 'headline', 'subheading', 'chapter', 'label'],
			mapping: {
				'headline large': 'headline-large',
				headline: 'headline',
				subheading: 'subheading',
				chapter: 'chapter',
				label: 'label',
			},
			control: {
				type: 'radio',
			},
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

export const Heading: HeadlineStory = {
	...HeadlineTemplate,
	args: {
		content: 'Headline',
		theme: 'standard',
		type: 'headline-large',
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
