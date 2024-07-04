import type {Meta} from '@storybook/react';
import {Summary as SummaryTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: SummaryTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children']},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-editorial-typography--summary'].figma,
		}
	},
} as Meta;


export const Summary = StoryTemplates.Summary;
