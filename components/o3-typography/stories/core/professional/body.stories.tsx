import type {Meta} from '@storybook/react';
import * as TypographyStories from '../../story-templates';
import {Body} from '../../../src/tsx';
import '../../../src/css/brands/professional.css';

export default {
	title: 'Core/Professional/o3-typography/Body',
	component: Body,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
	},
} as Meta;

export const BodyStory = TypographyStories.BodyTemplate;
