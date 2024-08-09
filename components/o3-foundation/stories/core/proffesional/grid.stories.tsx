import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../../storyTemplates'
import '../../../src/css/brands/professional.css';

export default {
	title: 'Core/Professional/o3-grid',
	tags: ['!autodocs'],
	...GridMetaGenerator('professional'),
} as Meta;

export const Grid: StoryObj = {};
