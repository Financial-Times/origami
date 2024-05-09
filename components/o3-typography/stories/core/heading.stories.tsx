import type {Meta} from '@storybook/react';
import {Heading as HeadingTsx} from '../../src/tsx';
import * as TypographyStories from '../story-templates';
import '../../main.css';

import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-typography',
	component: HeadingTsx,
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
	argTypes: {
		text: {
			control: 'text',
		},
	},
} as Meta;

export const HeadingStory = TypographyStories.HeadingTemplate;
