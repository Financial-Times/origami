import type {Meta} from '@storybook/react';
import {Caption} from '../../src/tsx';
import * as TypographyStories from '../story-templates';
import '../../main.css';

import '../../src/css/brands/whitelabel.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';

export default {
	title: 'Whitelabel/o3-typography/Caption',
	component: Caption,
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
			url: links['whitelabel-o3-typography-caption--caption-story'].figma,
		}
	},
} as Meta;

export const CaptionStory = TypographyStories.CaptionStory;
