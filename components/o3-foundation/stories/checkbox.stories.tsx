import links from '@financial-times/o3-figma-sb-links';
import type {Meta} from '@storybook/react';
import {CheckBox as CheckBoxTsx} from '../src/tsx';

import '../src/css/brands/core.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/sustainable-views.css';
import '../src/css/brands/whitelabel.css';

import {CheckBoxesWithDescriptionStory, CheckBoxStory} from './story-template';

export default {
	title: 'o3-foundation/o3-input/checkbox',
	component: CheckBoxTsx,
	tags: [
		'new',
		'core',
		'professional',
		'internal',
		'whitelabel',
		'sustainable-views',
	],
	decorators: [
		(Story, {args, globals}) => (
			<div
				data-o3-brand={globals.selectedBrand || 'whitelabel'}
				data-o3-theme={globals.selectedTheme || 'standard'}>
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

export const CheckBoxDescription = CheckBoxesWithDescriptionStory;
