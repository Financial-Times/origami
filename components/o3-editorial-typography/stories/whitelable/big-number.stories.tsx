import type {Meta} from '@storybook/react';
import {BigNumber as BigNumberTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/whitelabel.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-editorial-typography',
	component: BigNumberTsx,
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
			url: links['whitelabel-o3-editorial-typography--big-number'].figma,
		}
	},
} as Meta;

export const BigNumber = StoryTemplates.BigNumber;
