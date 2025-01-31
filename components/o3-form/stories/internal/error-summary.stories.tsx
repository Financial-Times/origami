import type {Meta} from '@storybook/react';
import links from '@financial-times/o3-figma-sb-links';
import {ErrorSummary as ErrorSummaryTsx} from '../../src/tsx/index';
import '../../src/css/brands/internal.css';
import {ErrorSummaryStory} from '../story-template';

export default {
	title: 'Internal/o3-form',
	component: ErrorSummaryTsx,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-form--error-summary'].figma,
		},
	},
} as Meta;

export const ErrorSummary = ErrorSummaryStory;
