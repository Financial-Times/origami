import type {Meta} from '@storybook/react';
import * as TypographyStories from '../../story-templates';

import {Footer} from '../../../src/tsx';
import '../../../src/css/brands/professional.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/Professional/o3-foundation/o3-typography/Footer',
	component: Footer,
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
			url: links['core-professional-o3-typography-footer--footer-story'].figma,
		},
	},
} as Meta;

export const FooterStory = TypographyStories.FooterTemplate;
