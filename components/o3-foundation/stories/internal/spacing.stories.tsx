import type {Meta, StoryObj} from '@storybook/react';
import * as TypographyStories from '../story-templates';

export default {
	title: 'Internal/o3-foundation/o3-spacing',
	tags: ['!autodocs'],
	...TypographyStories.SpacingMetaGenerator('internal'),
} as Meta;

export const Spacing: StoryObj = {};
