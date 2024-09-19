import type {Meta} from '@storybook/react';
import {BigNumber as BigNumberTsx} from '../../../src/tsx/index';
import * as StoryTemplates from '../../story-templates';

import '../../../src/css/brands/professional.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/Professional/o3-editorial-typography',
	component: BigNumberTsx,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		controls: {exclude: ['children']},
	},
} as Meta;


export const BigNumber = StoryTemplates.BigNumber;
BigNumber.parameters = {
	design: {
		type: 'figma',
		url: links['core-professional-o3-editorial-typography--big-number'].figma,
	},
};
