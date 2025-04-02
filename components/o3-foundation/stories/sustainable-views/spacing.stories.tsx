import type {Meta, StoryObj} from '@storybook/react';
import * as TypographyStories from '../story-templates';

export default {
	title: 'Sustainable views/o3-foundation/o3-spacing',
	tags: ['!autodocs'],
	...TypographyStories.SpacingMetaGenerator('sustainable-views'),
} as Meta;

export const Spacing: StoryObj = {};
