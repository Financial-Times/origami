import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from './story-templates';

export default {
	title: 'o3-foundation/o3-grid',
	tags: [
		'!autodocs',
		'core',
		'internal',
		'professional',
		'whitelabel',
		'sustainable-views',
	],
	...GridMetaGenerator('core'),
} as Meta;

export const Grid: StoryObj = {};
