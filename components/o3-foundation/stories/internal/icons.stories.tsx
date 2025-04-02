import type {Meta, StoryObj} from '@storybook/react';
import * as TypographyStories from '../story-templates';

export default {
	title: 'Internal/o3-foundation/o3-icon',
	tags: ['!autodocs'],
	...TypographyStories.IconMetaGenerator('internal'),
} as Meta;

export const Icon: StoryObj = {};
