import type {Meta, StoryObj} from '@storybook/react-webpack5';
import {GridMetaGenerator} from '../story-templates';

export default {
	title: 'Core/o3-foundation/o3-grid',
	tags: ['!autodocs'],
	...GridMetaGenerator('core'),
} as Meta;

export const Grid: StoryObj = {};
