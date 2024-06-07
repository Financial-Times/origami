import type {Meta} from '@storybook/react';
import {Headline} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/sustainable-views.css';

export default {
	title: 'Sustainable views/o3-editorial-typography',
	component: Headline,
	decorators: [
		Story => (
			<div data-o3-brand="sustainable-views">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children', 'underline', 'theme']},
	},
} as Meta;

const DesignParams = {
	type: 'figma',
	url: 'https://www.figma.com/file/5ATknbGociZMlnNXX4sy4f/Whitelabel---Design-System?type=design&node-id=4717-652&mode=design&t=Y50jCZbAtgxH2F3S-4',
};

export const Heading = StoryTemplates.Heading;
Heading.parameters = {
	design: DesignParams,
};

Heading.argTypes = {
	type: {
		options: ['headline', 'subheading', 'chapter', 'label'],
		control: {
			type: 'radio',
		},
	},
};

Heading.args = {
	...StoryTemplates.Heading.args,
	type: 'headline',
};
