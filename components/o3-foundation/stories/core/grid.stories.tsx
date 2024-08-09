import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../storyTemplates'
import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-grid',
	tags: ['!autodocs'],
	...GridMetaGenerator('core')
} as Meta;

export const Grid: StoryObj = {};
