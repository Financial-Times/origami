import type {Meta} from '@storybook/react';
import {Wrapper} from '../../src/tsx';
import * as TypographyStories from '../story-templates';
import '../../src/css/brands/internal.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Internal/o3-foundation/o3-typography',
	component: Wrapper,
	decorators: [
		Story => (
			<div data-o3-brand="internal">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
		design: {
			type: 'figma',
			url: links['internal-o3-typography--wrapper-story'].figma,
		},
	},
	argTypes: {
		theme: {
			options: ['standard', 'inverse'],
			control: {
				type: 'radio',
			},
		},
	},
} as Meta;

export const WrapperStory = TypographyStories.WrapperTemplate;