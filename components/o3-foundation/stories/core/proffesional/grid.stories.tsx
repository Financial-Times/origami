import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../../storyTemplates'

export default {
	title: 'Core/Professional/o3-grid',
	tags: ['!autodocs'],
	...GridMetaGenerator('professional'),
} as Meta;

export const Grid: StoryObj = {};
