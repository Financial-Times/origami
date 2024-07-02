import type {Meta} from '@storybook/react';
import {Body as BodyTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/core.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';

export default {
	title: 'Core/o3-editorial-typography',
	component: BodyTsx,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		controls: {exclude: ['children', 'dropCap']},
	},
} as Meta;


export const Body = StoryTemplates.Body;
Body.parameters = {
	design: {
		type: 'figma',
		url: links['core-o3-editorial-typography--body'].figma
	},
};
