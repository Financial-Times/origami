import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';
import {OrderedList} from '../../src/tsx';
import '../../src/css/brands/internal.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Internal/o3-typography/OrderedList',
	component: OrderedList,
	decorators: [
		Story => (
			<div data-o3-brand="internal">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		design: {
			type: 'figma',
			url: links['internal-o3-typography-orderedlist--ordered-list-story']
				.figma,
		},
	},
} as Meta;

export const OrderedListStory = TypographyStories.OrderedListTemplate;
