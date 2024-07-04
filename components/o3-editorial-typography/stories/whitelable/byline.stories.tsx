import type {Meta} from '@storybook/react';
import {Byline as BylineTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: BylineTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children', 'brand', 'theme']},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-editorial-typography--byline'].figma,
		},
	},
} as Meta;

export const Byline = StoryTemplates.Byline;
Byline.args = {
	...StoryTemplates.Byline.args,
	brand: 'whitelabel',
};
