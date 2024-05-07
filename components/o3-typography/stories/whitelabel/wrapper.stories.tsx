import type {Meta} from '@storybook/react';
import {Wrapper} from '../../src/tsx';
import * as TypographyStories from '../story-templates';
import '../../src/css/brands/whitelabel.css';

export default {
	title: 'Whitelabel/o3-typography',
	component: Wrapper,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
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
