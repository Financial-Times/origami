import type {Meta, StoryObj} from '@storybook/react';
import * as FoundationStories from '../story-templates';

export default {
	title: 'Core/o3-foundation/o3-icon',
	tags: ['!autodocs'],
	...FoundationStories.IconMetaGenerator('core'),
} as Meta;

export const Icon: StoryObj = {};
