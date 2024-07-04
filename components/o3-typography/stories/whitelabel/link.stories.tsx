import * as TypographyStories from '../story-templates';
import {Link as LinkTsx} from '../../src/tsx';

import '../../src/css/brands/whitelabel.css';
import {Meta} from '@storybook/react';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Whitelabel/o3-typography/Link',
	component: LinkTsx,
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
		design: {
			type: 'figma',
			url: links['whitelabel-o3-typography-link--link'].figma,
		}
	},
} as Meta;

export const Link = TypographyStories.LinkTemplate;
