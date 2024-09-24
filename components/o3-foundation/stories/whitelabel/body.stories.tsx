import * as TypographyStories from '../story-templates';
import {Body as BodyTsx} from '../../src/tsx';

import '../../src/css/brands/whitelabel.css';
import {Meta} from '@storybook/react';

import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-foundation/o3-typography/Body',
	component: BodyTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-typography-body--body'].figma,
		}
	},
} as Meta;

export const Body = TypographyStories.BodyTemplate;
