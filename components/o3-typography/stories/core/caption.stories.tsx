import type {Meta} from '@storybook/react';
import {Caption} from '../../src/tsx';
import * as TypographyStories from '../story-templates';
import '../../main.css';

import '../../src/css/brands/core.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';

export default {
	title: 'Core/o3-typography/Caption',
	component: Caption,
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
			url: links['core-o3-typography-caption--caption-story'].figma,

		}
	},
} as Meta;

export const CaptionStory = TypographyStories.CaptionStory;
