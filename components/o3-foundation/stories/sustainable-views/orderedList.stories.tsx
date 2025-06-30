import type {Meta} from '@storybook/react-webpack5';
import * as FoundationStories from '../story-templates';
import {OrderedList} from '../../src/tsx';
import '../../src/css/brands/sustainable-views.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Sustainable views/o3-foundation/o3-typography/OrderedList',
	component: OrderedList,
	decorators: [
		Story => (
			<div data-o3-brand="sustainable-views">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		design: {
			type: 'figma',
			url: links[
				'sustainable-views-o3-typography-orderedlist--ordered-list-story'
			].figma,
		},
	},
} as Meta;

export const OrderedListStory = FoundationStories.OrderedListTemplate;
