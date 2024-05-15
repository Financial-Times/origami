import * as TypographyStories from '../story-templates';
import {Body as BodyTsx} from '../../src/tsx';

import '../../src/css/brands/internal.css';
import {Meta} from '@storybook/react';

export default {
	title: 'Internal/o3-typography/Body',
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
	},
} as Meta;

export const Body = TypographyStories.BodyTemplate;
