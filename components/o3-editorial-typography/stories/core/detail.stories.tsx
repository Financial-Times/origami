import type {Meta} from '@storybook/react';
import {Detail as DetailTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-editorial-typography',
	component: DetailTsx,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		controls: {exclude: ['children']},
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/5ATknbGociZMlnNXX4sy4f/Whitelabel---Design-System?type=design&node-id=4717-652&mode=design&t=Y50jCZbAtgxH2F3S-4',
		},
	},
} as Meta;


export const Detail = StoryTemplates.Detail;
export const Quote = StoryTemplates.Quote;
export const BigNumber = StoryTemplates.BigNumber;
export const Byline = StoryTemplates.Byline;
