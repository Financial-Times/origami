import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';
import {CheckBoxGroup as CheckBoxGroupTsx} from '../src/tsx';

import '../src/css/brands/core.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/whitelabel.css';
import '../src/css/brands/sustainable-views.css';

import {CheckBoxGroupStory} from './story-template';

export default {
	title: 'o3-form',
	component: CheckBoxGroupTsx,
	tags: [
		'experimental',
		'core',
		'professional',
		'internal',
		'whitelabel',
		'sustainable-views',
	],
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
			url: links['whitelabel-o3-form--check-box-group'].figma,
		},
	},
} as Meta;

export const CheckBoxGroup = CheckBoxGroupStory;
