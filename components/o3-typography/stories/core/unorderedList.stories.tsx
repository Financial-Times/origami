import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';
import {UnorderedList} from '../../src/tsx';
import '../../src/css/brands/core.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';

export default {
	title: 'Core/o3-typography/UnorderedList',
	component: UnorderedList,
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
			url: links['core-o3-typography-unorderedlist--unordered-list-story'].figma,
		}
	},
} as Meta;

export const UnorderedListStory = TypographyStories.UnorderedListTemplate;
