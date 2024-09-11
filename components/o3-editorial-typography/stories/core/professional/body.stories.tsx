import type {Meta} from '@storybook/react';
import {Body as BodyTsx} from '../../../src/tsx/index';
import * as StoryTemplates from '../../story-templates';

import '../../../src/css/brands/professional.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/Professional/o3-editorial-typography',
	component: BodyTsx,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
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
		url: links['core-professional-o3-editorial-typography--body'].figma
	},
};
