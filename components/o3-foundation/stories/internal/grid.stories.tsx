import type {Meta, StoryObj} from '@storybook/react';
import {GridMetaGenerator} from '../story-templates'

export default {
	title: 'Internal/o3-foundation/o3-grid',
	tags: ['!autodocs'],
	...GridMetaGenerator('internal'),
} as Meta;

export const Grid: StoryObj = {};
