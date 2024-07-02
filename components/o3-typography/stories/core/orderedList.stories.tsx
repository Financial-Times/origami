import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';
import {OrderedList} from '../../src/tsx';
import '../../src/css/brands/core.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';

export default {
	title: 'Core/o3-typography/OrderedList',
	component: OrderedList,
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

export const OrderedListStory = TypographyStories.OrderedListTemplate;
