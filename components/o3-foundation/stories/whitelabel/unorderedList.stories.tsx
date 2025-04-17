import type {Meta} from '@storybook/react';
import * as FoundationStories from '../story-templates';
import {UnorderedList} from '../../src/tsx';
import '../../src/css/brands/whitelabel.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-foundation/o3-typography/UnorderedList',
	component: UnorderedList,
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
			url: links['whitelabel-o3-typography-unorderedlist--unordered-list-story']
				.figma,
		},
	},
} as Meta;

export const UnorderedListStory = FoundationStories.UnorderedListTemplate;
