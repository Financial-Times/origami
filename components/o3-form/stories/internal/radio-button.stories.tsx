import type {Meta} from '@storybook/react';
import links from "@financial-times/o3-figma-sb-links"
import {RadioButtonGroup as RadioButtonTsx} from '../../src/tsx/index';
import '../../src/css/brands/internal.css';
import {RadioButtonGroupStory} from '../story-template';

export default {
	title: 'Internal/o3-form',
	component: RadioButtonTsx,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
		design: {
			type: 'figma',
			url: links["whitelabel-o3-form--radio-button"].figma
		}
	},
} as Meta;

export const RadioButton = RadioButtonGroupStory;
