import {Headline as HeadlineTsx} from "../src/tsx/index";
import {TemplateSBConfig} from "./sb-story-config"

import type {StoryObj} from '@storybook/react';
import type {HeadlineProps} from "../src/types/index";

type HeadlineStory = Omit<StoryObj, 'args'> & {
	args: Omit<HeadlineProps, 'children'>;
}


const HeadlineTemplate: StoryObj = {
	...TemplateSBConfig,
	render: args => {
		return <HeadlineTsx {...args}>Headline</HeadlineTsx>;
	},
};

export const Heading: HeadlineStory = {
	...HeadlineTemplate,
	args: {
		theme: 'standard',
		type: 'headline-large',
	}
};
