import type {Meta} from '@storybook/react-webpack5';
import links from "@financial-times/o3-figma-sb-links"
import {CheckBox as CheckBoxTsx} from '../../src/tsx/index';
import '../../src/css/brands/core.css';
import {CheckBoxStory} from '../story-template';

export default {
	title: 'Core/o3-form',
	component: CheckBoxTsx,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
		design: {
			type: 'figma',
			url: links["whitelabel-o3-form--check-box"].figma
		}
	},
} as Meta;

export const CheckBox = CheckBoxStory;
