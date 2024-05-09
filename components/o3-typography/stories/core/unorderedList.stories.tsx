import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';
import {UnorderedList} from '../../src/tsx';
import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-typography',
	component: UnorderedList,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
	},
} as Meta;

export const UnorderedListStory = TypographyStories.UnorderedListTemplate;
