import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';
import {UnorderedList} from '../../src/tsx';
import '../../src/css/brands/internal.css';

export default {
	title: 'Internal/o3-typography/UnorderedList',
	component: UnorderedList,
	decorators: [
		Story => (
			<div data-o3-brand="internal">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
	},
} as Meta;

export const UnorderedListStory = TypographyStories.UnorderedListTemplate;
