import type {Meta} from '@storybook/react';
import {Wrapper} from '../../../src/tsx';
import * as TypographyStories from '../../story-templates';
import '../../../src/css/brands/professional.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/Professional/o3-typography',
	component: Wrapper,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		design: {
			type: 'figma',
			url: links['core-professional-o3-typography--wrapper-story'].figma,
		},
	},
	argTypes: {
		theme: {
			options: ['standard', 'inverse'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

export const WrapperStory = TypographyStories.WrapperTemplate;
