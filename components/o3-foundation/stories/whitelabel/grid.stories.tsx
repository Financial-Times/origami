import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../story-templates'

export default {
	title: 'Whitelabel/o3-foundation/o3-grid',
	tags: ['!autodocs'],
	...GridMetaGenerator('whitelabel'),
} as Meta;

export const Grid: StoryObj = {};
