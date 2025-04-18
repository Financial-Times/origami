import type {Meta} from '@storybook/react';
import * as FoundationStories from '../../story-templates';
import {UnorderedList} from '../../../src/tsx';
import '../../../src/css/brands/professional.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/Professional/o3-foundation/o3-typography/UnorderedList',
	component: UnorderedList,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		design: {
			type: 'figma',
			url: links[
				'core-professional-o3-typography-unorderedlist--unordered-list-story'
			].figma,
		},
	},
} as Meta;

export const UnorderedListStory = FoundationStories.UnorderedListTemplate;
