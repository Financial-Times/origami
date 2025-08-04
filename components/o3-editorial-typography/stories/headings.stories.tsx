import type {Meta} from '@storybook/react';
import {Heading} from '../src/tsx';
import * as StoryTemplates from './story-templates';

import '../src/css/brands/core.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/whitelabel.css';
import '../src/css/brands/sustainable-views.css';

import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'o3-editorial-typography',
	component: Heading,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		controls: {exclude: ['children']},
	},
	tags: ['autodocs', 'core', 'professional', 'whitelabel', 'sustainable-views'],
} as Meta;

export const Headings = StoryTemplates.Heading;
Headings.parameters = {
	design: {
		type: 'figma',
		url: links['core-o3-editorial-typography--headings'].figma,
	},
};
