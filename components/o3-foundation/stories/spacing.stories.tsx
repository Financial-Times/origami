import type {Meta, StoryObj} from '@storybook/react';
import * as FoundationStories from './story-templates';

export default {
	title: 'o3-foundation/o3-spacing',
	tags: [
		'!autodocs',
		'core',
		'internal',
		'professional',
		'whitelabel',
		'sustainable-views',
	],
	...FoundationStories.SpacingMetaGenerator('core'),
} as Meta;

export const Spacing: StoryObj = {};
