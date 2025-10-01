import type {Meta, StoryObj} from '@storybook/react';
import * as FoundationStories from './story-templates';

export default {
	title: 'o3-foundation/o3-icon',
	tags: [
		'!autodocs',
		'core',
		'internal',
		'professional',
		'whitelabel',
		'sustainable-views',
	],
	...FoundationStories.IconMetaGenerator('core'),
} as Meta;

export const Icon: StoryObj = {};
