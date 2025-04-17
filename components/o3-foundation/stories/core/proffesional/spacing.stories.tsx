import type {Meta, StoryObj} from '@storybook/react';
import * as FoundationStories from '../../story-templates';

export default {
	title: 'Core/Professional/o3-foundation/o3-spacing',
	tags: ['!autodocs'],
	...FoundationStories.SpacingMetaGenerator('core-professional'),
} as Meta;

export const Spacing: StoryObj = {};
