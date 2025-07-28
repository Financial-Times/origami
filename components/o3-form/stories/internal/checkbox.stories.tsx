import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';
import {CheckBox as CheckBoxTsx} from '../../src/tsx/index';
import '../../src/css/brands/internal.css';
import {CheckBoxStory} from '../story-template';

export default {
	title: 'Internal/o3-form',
	component: CheckBoxTsx,
	tags: ['experimental'],
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
			url: links['whitelabel-o3-form--check-box'].figma,
		},
	},
} as Meta;

export const CheckBox = CheckBoxStory;
