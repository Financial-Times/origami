import type {Meta} from '@storybook/react';
import {Caption as CaptionTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: CaptionTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children', 'theme']},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-editorial-typography--caption'].figma,
		}
	},
} as Meta;



export const Caption = StoryTemplates.Caption;
