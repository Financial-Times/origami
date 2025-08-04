import type {Meta} from '@storybook/react';
import * as FoundationStories from './story-templates';
import {OrderedList} from '../src/tsx';

import '../src/css/brands/core.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/whitelabel.css';
import '../src/css/brands/sustainable-views.css';

import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'o3-foundation/o3-typography/OrderedList',
	component: OrderedList,
	tags: [
		'!autodocs',
		'core',
		'internal',
		'professional',
		'whitelabel',
		'sustainable-views',
	],
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		design: {
			type: 'figma',
			url: links['core-o3-typography-orderedlist--ordered-list-story'].figma,
		},
	},
} as Meta;

export const OrderedListStory = FoundationStories.OrderedListTemplate;
