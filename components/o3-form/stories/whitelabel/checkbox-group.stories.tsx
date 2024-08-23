import type {Meta} from '@storybook/react';
import {CheckBoxGroup as CheckBoxGroupTsx} from '../../src/tsx/index';
import '../../src/css/brands/whitelabel.css';
import {CheckBoxGroupStory} from '../story-template';

export default {
	title: 'Whitelabel/o3-form',
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
	},
} as Meta;

export const CheckBoxGroup = CheckBoxGroupStory;
