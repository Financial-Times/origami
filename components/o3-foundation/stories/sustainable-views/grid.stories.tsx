import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../storyTemplates'
import '../../src/css/brands/sustainable-views.css';

export default {
	title: 'Sustainable-views/o3-grid',
	...GridMetaGenerator('sustainable-views'),
} as Meta;

export const Grid: StoryObj = {};
