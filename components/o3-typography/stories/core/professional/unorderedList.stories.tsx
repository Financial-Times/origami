import type {Meta} from '@storybook/react';
import * as TypographyStories from '../../story-templates';
import {UnorderedList} from '../../../src/tsx';
import '../../../src/css/brands/professional.css';

export default {
	title: 'Core/Professional/o3-typography/UnorderedList',
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
	},
} as Meta;

export const UnorderedListStory = TypographyStories.UnorderedListTemplate;
