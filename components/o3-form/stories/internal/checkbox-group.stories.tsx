import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';
import {CheckBoxGroup as CheckBoxGroupTsx} from '../../src/tsx/index';
import '../../src/css/brands/internal.css';
import {CheckBoxGroupStory} from '../story-template';

export default {
	title: 'Internal/o3-form',
	component: CheckBoxGroupTsx,
	tags: ['experimental'],
	decorators: [
		Story => (
			<div data-o3-brand="internal">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--check-box-group'].figma,
		},
	},
} as Meta;

export const CheckBoxGroup = CheckBoxGroupStory;
