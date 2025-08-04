import '../src/css/brands/core.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/whitelabel.css';
import '../src/css/brands/sustainable-views.css';

import type {Meta, StoryObj} from '@storybook/react';
import * as FoundationStories from './story-templates';
import {getColorPalette, getColorTints, getColorUsecases} from './utils';

export default {
	title: 'o3-foundation/o3-color',
	tags: [
		'!autodocs',
		'core',
		'internal',
		'professional',
		'whitelabel',
		'sustainable-views',
	],
	...FoundationStories.ColorPaletteMetaGenerator('core'),
} as Meta;

export const PrimaryPalette: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/core.js').then(tokens => {
					return getColorPalette(tokens.default, 'primary');
				})
			);
			return {colors};
		},
	],
};

export const SecondaryPalette: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/core.js').then(tokens =>
					getColorPalette(tokens.default, 'secondary')
				)
			);
			return {colors};
		},
	],
};

export const TertiaryPalette: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/core.js').then(tokens =>
					getColorPalette(tokens.default, 'tertiary')
				)
			);
			return {colors};
		},
	],
};

export const TonesAndMixes: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/core.js').then(tokens =>
					getColorTints(tokens.default)
				)
			);
			return {colors};
		},
	],
};

export const Usecases: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/core.js').then(tokens =>
					getColorUsecases(tokens.default)
				)
			);
			return {colors};
		},
	],
};
