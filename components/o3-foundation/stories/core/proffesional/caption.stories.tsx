import type {Meta} from '@storybook/react';
import {Caption} from '../../../src/tsx';
import * as TypographyStories from '../../story-templates';
import '../../../main.css';

import '../../../src/css/brands/professional.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/Professional/o3-foundation/o3-typography/Caption',
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
		design: {
			type: 'figma',
			url: links['core-professional-o3-typography-caption--caption-story'].figma,
		}
	},
} as Meta;

export const CaptionStory = TypographyStories.CaptionStory;
