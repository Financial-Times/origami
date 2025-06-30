import type {Meta} from '@storybook/react-webpack5';
import {List as ListTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: ListTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		html: {
			root: '#component-wrapper',
		},
		controls: {exclude: ['theme']},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-editorial-typography--list'].figma,
		},
	},
} as Meta;

export const List = StoryTemplates.List;
