import * as TypographyStories from '../story-templates';
import {Link as LinkTsx} from '../../src/tsx';

import '../../src/css/brands/sustainable-views.css';
import {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Sustainable views/o3-foundation/o3-typography/Link',
	component: LinkTsx,
	tags: ['autodocs'],
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
			url: links['sustainable-views-o3-typography-link--link'].figma,
		},
	},
} as Meta;

export const Link = TypographyStories.LinkTemplate;
