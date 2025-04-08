import type {Meta} from '@storybook/react';
import {Heading} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: Heading,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children', 'underline', 'theme']},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-editorial-typography--headings'].figma,
		},
	},
} as Meta;

export const Headings = StoryTemplates.Heading;
Headings.argTypes = {
	type: {
		options: ['headline', 'subheading', 'chapter', 'label'],
		control: {
			type: 'radio',
		},
	},
};

Headings.args = {
	...StoryTemplates.Heading.args,
	type: 'headline',
};
