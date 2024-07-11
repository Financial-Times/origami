import type {Meta} from '@storybook/react';
import {Link as LinkTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/core.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/o3-editorial-typography',
	component: LinkTsx,
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
} as Meta;


export const Link = StoryTemplates.Link;
Link.parameters = {
	design: {
		type: 'figma',
		url: links['core-o3-editorial-typography--link'].figma
	},
};
