import type {Meta} from '@storybook/react';
import {CheckBox as CheckBoxTsx} from '../../src/tsx/CheckBox';
import '../../src/css/brands/whitelabel.css';
import links from '@financial-times/o3-figma-sb-links';

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

export const CheckBox = {};
