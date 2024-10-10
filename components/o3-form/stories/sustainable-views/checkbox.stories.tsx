import type {Meta} from '@storybook/react';
import links from "@financial-times/o3-figma-sb-links"
import {CheckBox as CheckBoxTsx} from '../../src/tsx/index';
import '../../src/css/brands/whitelabel.css';
import {CheckBoxStory} from '../story-template';

export default {
	title: 'Sustainable Views/o3-form',
	component: CheckBoxTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
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
