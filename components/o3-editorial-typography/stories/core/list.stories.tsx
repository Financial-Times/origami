import type {Meta} from '@storybook/react';
import {List as ListTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/core.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';

export default {
	title: 'Core/o3-editorial-typography',
	component: ListTsx,
	decorators: [
		Story => (
			<div data-o3-brand="core">
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
		url: links['core-o3-editorial-typography--list'].figma,
	},
};
