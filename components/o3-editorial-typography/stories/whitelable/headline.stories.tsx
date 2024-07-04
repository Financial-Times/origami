import type {Meta} from '@storybook/react';
import {Headline} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: Headline,
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
			url: links['whitelabel-o3-editorial-typography--heading'].figma,
		},
	},
} as Meta;

export const Heading = StoryTemplates.Heading;
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
