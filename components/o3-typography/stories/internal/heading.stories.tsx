import type {Meta} from '@storybook/react';
import {Heading as HeadingTsx} from '../../src/tsx';
import * as TypographyStories from '../story-templates';

import '../../src/css/brands/internal.css';

export default {
	title: 'Internal/o3-typography',
	component: HeadingTsx,
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

export const HeadingStory = TypographyStories.HeadingTemplate;
