import type {Meta} from '@storybook/react';
import {SocialSignIn as SocialSignInTsx} from '../../src/tsx/socialSignIn';
import {SocialSignInStory} from '../story-templates';
import '../../main.css';

export default {
	title: 'Core/o3-social-sign-in',
	component: SocialSignInTsx,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		design: {
			type: 'figma',
			// url: links['o3-social-sign-in'].figma,
		},
	},
} as Meta;

export const SocialSignInStories = SocialSignInStory;