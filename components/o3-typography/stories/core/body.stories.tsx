import type {Meta} from '@storybook/react';
import * as TypographyStories from '../story-templates';
import {Body} from '../../src/tsx';
import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-typography',
	component: Body,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
	},
} as Meta;

export const BodyStory = TypographyStories.BodyTemplate;
