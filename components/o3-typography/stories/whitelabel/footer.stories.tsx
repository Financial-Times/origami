import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';

import {Footer} from '../../src/tsx';
import '../../src/css/brands/whitelabel.css';

export default {
	title: 'Whitelabel/o3-typography',
	component: Footer,
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

export const FooterStory = TypographyStories.FooterTemplate;
