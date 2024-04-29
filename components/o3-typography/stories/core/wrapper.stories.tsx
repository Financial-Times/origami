import type {Meta} from '@storybook/react';
import {Wrapper} from '../../src/tsx';
import * as TypographyStories from '../story-templates';
import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-typography',
	component: Wrapper,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
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
