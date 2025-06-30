import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as FoundationStories from '../story-templates';

export default {
	title: 'Sustainable views/o3-foundation/o3-spacing',
	tags: ['!autodocs'],
	...FoundationStories.SpacingMetaGenerator('sustainable-views'),
} as Meta;

export const Spacing: StoryObj = {};
