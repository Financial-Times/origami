import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';

import {Footer} from '../../src/tsx';
import '../../src/css/brands/sustainable-views.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Sustainable views/o3-foundation/o3-typography/Footer',
	component: Footer,
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
			url: links['sustainable-views-o3-typography-footer--footer-story'].figma,
		},
	},
} as Meta;

export const FooterStory = TypographyStories.FooterTemplate;
