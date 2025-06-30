import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as FoundationStories from '../../story-templates';

export default {
	title: 'Core/Professional/o3-foundation/o3-icon',
	tags: ['!autodocs'],
	...FoundationStories.IconMetaGenerator('core-professional'),
} as Meta;

export const Icon: StoryObj = {};
