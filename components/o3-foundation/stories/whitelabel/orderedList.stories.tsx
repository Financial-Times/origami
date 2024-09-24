import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';
import {OrderedList} from '../../src/tsx';
import '../../src/css/brands/whitelabel.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-foundation/o3-typography/OrderedList',
	component: OrderedList,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-typography-orderedlist--ordered-list-story'].figma,
		}
	},
} as Meta;

export const OrderedListStory = TypographyStories.OrderedListTemplate;
