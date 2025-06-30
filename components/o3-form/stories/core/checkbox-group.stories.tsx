import type {Meta} from '@storybook/react-webpack5';
import links from "@financial-times/o3-figma-sb-links"
import {CheckBoxGroup as CheckBoxGroupTsx} from '../../src/tsx/index';
import '../../src/css/brands/core.css';
import {CheckBoxGroupStory} from '../story-template';

export default {
	title: 'Core/o3-form',
	component: CheckBoxGroupTsx,
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
			url: links["whitelabel-o3-form--check-box-group"].figma
		}
	},
} as Meta;

export const CheckBoxGroup = CheckBoxGroupStory;
