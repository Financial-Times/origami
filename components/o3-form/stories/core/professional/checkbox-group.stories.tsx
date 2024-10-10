import type {Meta} from '@storybook/react';
import links from "@financial-times/o3-figma-sb-links"
import {CheckBoxGroup as CheckBoxGroupTsx} from '../../../src/tsx';
import '../../../src/css/brands/whitelabel.css';
import {CheckBoxGroupStory} from '../../story-template';

export default {
	title: 'Core/Professional/o3-form',
	component: CheckBoxGroupTsx,
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
			url: links["whitelabel-o3-form--check-box-group"].figma
		}
	},
} as Meta;

export const CheckBoxGroup = CheckBoxGroupStory;
