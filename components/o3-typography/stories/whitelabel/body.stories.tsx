import * as TypographyStories from '../story-templates';
import {Body as BodyTsx} from '../../src/tsx';

import '../../src/css/brands/whitelabel.css';
import {Meta} from '@storybook/react';

export default {
	title: 'Whitelabel/o3-typography',
	component: BodyTsx,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
	},
} as Meta;

export const Body = TypographyStories.BodyTemplate;
