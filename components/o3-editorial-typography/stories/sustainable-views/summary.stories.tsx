import type {Meta} from '@storybook/react-webpack5';
import {Summary as SummaryTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/sustainable-views.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Sustainable views/o3-editorial-typography',
	component: SummaryTsx,
	decorators: [
		Story => (
			<div data-o3-brand="sustainable-views">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		controls: {exclude: ['children']},
		design: {
			type: 'figma',
			url: links['sustainable-views-o3-editorial-typography--summary'].figma,
		}
	},
} as Meta;


export const Summary = StoryTemplates.Summary;
