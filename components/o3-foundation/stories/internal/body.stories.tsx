import * as TypographyStories from '../story-templates';
import {Body as BodyTsx} from '../../src/tsx';

import '../../src/css/brands/internal.css';
import {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Internal/o3-foundation/o3-typography/Body',
	component: BodyTsx,
	decorators: [
		Story => (
			<div data-o3-brand="internal">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		design: {
			type: 'figma',
			url: links['internal-o3-typography-body--body'].figma,
		},
	},
} as Meta;

export const Body = TypographyStories.BodyTemplate;
