import type {Meta} from '@storybook/react';
import {List as ListTsx} from '../../../src/tsx/index';
import * as StoryTemplates from '../../story-templates';

import '../../../src/css/brands/professional.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/Professional/o3-editorial-typography',
	component: ListTsx,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		html: {
			root: '#component-wrapper',
		},
	},
} as Meta;

export const List = StoryTemplates.List;
List.parameters = {
	design: {
		type: 'figma',
		url: links['core-professional-o3-editorial-typography--list'].figma,
	},
};
