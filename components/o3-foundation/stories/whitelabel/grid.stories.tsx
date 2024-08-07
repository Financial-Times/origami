import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../storyTemplates'
import '../../src/css/brands/whitelabel.css';

export default {
	title: 'Whitelabel/o3-grid',
	...GridMetaGenerator('whitelabel'),
} as Meta;

export const Grid: StoryObj = {};
