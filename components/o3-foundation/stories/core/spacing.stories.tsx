import type {Meta, StoryObj} from '@storybook/react';
import * as TypographyStories from '../story-templates';

export default {
	title: 'Core/o3-foundation/o3-spacing',
	tags: ['!autodocs'],
	...TypographyStories.SpacingMetaGenerator('core'),
} as Meta;

export const Spacing: StoryObj = {};
