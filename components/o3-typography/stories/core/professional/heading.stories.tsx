import type {Meta} from '@storybook/react';
import {Heading as HeadingTsx} from '../../../src/tsx';
import * as TypographyStories from '../../story-templates';
import '../../../main.css';

import '../../../src/css/brands/professional.css';

export default {
	title: 'Core/Professional/o3-typography/Heading',
	component: HeadingTsx,
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
	argTypes: {
		text: {
			control: 'text',
		},
	},
} as Meta;

export const HeadingStory = TypographyStories.HeadingTemplate;
