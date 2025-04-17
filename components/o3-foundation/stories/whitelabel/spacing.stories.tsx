import type {Meta, StoryObj} from '@storybook/react';
import * as FoundationStories from '../story-templates';

export default {
	title: 'Whitelabel/o3-foundation/o3-spacing',
	tags: ['!autodocs'],
	...FoundationStories.SpacingMetaGenerator('whitelabel'),
} as Meta;

export const Spacing: StoryObj = {};
