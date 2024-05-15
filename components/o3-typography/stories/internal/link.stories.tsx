import * as TypographyStories from '../story-templates';
import {Link as LinkTsx} from '../../src/tsx';

import '../../src/css/brands/internal.css';
import {Meta} from '@storybook/react';

export default {
	title: 'Internal/o3-typography/Link',
	component: LinkTsx,
	tags: ['autodocs'],
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

export const Link = TypographyStories.LinkTemplate;
