import type {Meta} from '@storybook/react';
import {Heading as HeadingTsx} from '../../src/tsx';
import * as TypographyStories from '../story-templates';

import '../../src/css/brands/sustainable-views.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Sustainable views/o3-foundation/o3-typography/Heading',
	component: HeadingTsx,
	decorators: [
		Story => (
			<div data-o3-brand="sustainable-views">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		design: {
			type: 'figma',
			url: links['sustainable-views-o3-typography-heading--heading-story']
				.figma,
		},
	},
} as Meta;

export const Headings = TypographyStories.HeadingTemplate;
