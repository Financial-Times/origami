import type {Meta} from '@storybook/react';
import {SocialSignIn as SocialSignInTsx} from '../../src/tsx/socialSignIn';
import {SocialSignInStory} from '../story-templates';
import links from '@financial-times/o3-figma-sb-links';
import '../../src/css/brands/whitelabel.css';

export default {
	title: 'Whitelabel/o3-social-sign-in',
	component: SocialSignInTsx,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel" className="o3-grid">
				<div style={{gridColumn: 'content-start / content-end'}}>
					<Story />
				</div>
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-social-sign-in--social-sign-in-stories'].figma,
		},
	},
} as Meta;

export const SocialSignInStories = SocialSignInStory;