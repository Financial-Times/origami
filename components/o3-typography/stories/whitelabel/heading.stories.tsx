import type {Meta} from '@storybook/react';
import {Heading as HeadingTsx} from '../../src/tsx';
import * as TypographyStories from '../story-templates';
import '../../main.css';

import '../../src/css/brands/whitelabel.css';

export default {
	title: 'Whitelabel/o3-typography',
	component: HeadingTsx,
	decorators: [
		Story => (
			<div className="o3-brand-whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
	},
} as Meta;

export const HeadingStory = TypographyStories.HeadingTemplate;
