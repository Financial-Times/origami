import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../storyTemplates'

export default {
	title: 'Sustainable-views/o3-grid',
	tags: ['!autodocs'],
	...GridMetaGenerator('sustainable-views'),
} as Meta;

export const Grid: StoryObj = {};
