import links from '@financial-times/o3-figma-sb-links';
import type {Meta} from '@storybook/react';
import '../src/css/brands/core.css';
import {ErrorSummary as ErrorSummaryTsx} from '../src/tsx';
import {ErrorSummaryStory} from './story-template';

export default {
	title: 'o3-foundation/o3-input/error',
	component: ErrorSummaryTsx,
	tags: [
		'new',
		'core',
		'professional',
		'internal',
		'whitelabel',
		'sustainable-views',
	],
	decorators: [
		(Story, {args, globals}) => (
			<div data-o3-brand={globals.selectedBrand || 'whitelabel'}>
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
