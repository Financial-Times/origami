import type {Meta} from '@storybook/react';
import {Caption} from '../../../src/tsx';
import * as TypographyStories from '../../story-templates';
import '../../../main.css';

import '../../../src/css/brands/professional.css';

export default {
	title: 'Core/Professional/o3-typography/Caption',
	component: Caption,
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

export const CaptionStory = TypographyStories.CaptionStory;
