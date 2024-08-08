import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../storyTemplates'
import '../../src/css/brands/internal.css';

export default {
	title: 'Internal/o3-grid',
	tags: ['!autodocs'],
	...GridMetaGenerator('internal'),
} as Meta;

export const Grid: StoryObj = {};
