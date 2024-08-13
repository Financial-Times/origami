import type {Meta} from '@storybook/react';
import {CheckBox as CheckBoxTsx} from '../../src/tsx/index';
import '../../src/css/brands/whitelabel.css';
import {CheckBoxStory} from '../story-template';

export default {
	title: 'Whitelabel/o3-form',
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
	},
} as Meta;

export const CheckBox = CheckBoxStory;
