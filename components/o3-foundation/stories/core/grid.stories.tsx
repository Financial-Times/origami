import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../storyTemplates'
import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-grid',
	...GridMetaGenerator('core'),
} as Meta;

export const Grid: StoryObj = {};
