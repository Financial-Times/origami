import type {Meta} from '@storybook/react';
import {StandFirst as StandFirstTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: StandFirstTsx,
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
			url: links['whitelabel-o3-editorial-typography--stand-first'].figma,
		}
	},
} as Meta;

export const StandFirst = StoryTemplates.StandFirst;

