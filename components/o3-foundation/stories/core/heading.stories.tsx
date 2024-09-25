import type {Meta} from '@storybook/react';
import {Heading as HeadingTsx} from '../../src/tsx';
import * as TypographyStories from '../story-templates';
import '../../main.css';

import '../../src/css/brands/core.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/o3-foundation/o3-typography/Heading',
	component: HeadingTsx,
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
			url: links['core-o3-typography-heading--heading-story'].figma
		}
	},
	argTypes: {
		text: {
			control: 'text',
		},
	},
} as Meta;

export const HeadingStory = TypographyStories.HeadingTemplate;
