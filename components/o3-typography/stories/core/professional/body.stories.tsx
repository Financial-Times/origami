import type {Meta} from '@storybook/react';
import * as TypographyStories from '../../story-templates';
import {Body} from '../../../src/tsx';
import '../../../src/css/brands/professional.css';

import links from '../../../../../libraries/o3-figma-sb-links/src/links.json';

export default {
	title: 'Core/Professional/o3-typography/Body',
	component: Body,
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
			url: links['core-professional-o3-typography-body--body-story'].figma,
		},
	},
} as Meta;

export const BodyStory = TypographyStories.BodyTemplate;
