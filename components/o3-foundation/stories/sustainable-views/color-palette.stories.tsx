import '../../src/css/brands/sustainable-views.css';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as FoundationStories from '../story-templates';
import {getColorPalette, getColorTints, getColorUsecases} from '../utils';

export default {
	title: 'Sustainable views/o3-foundation/o3-color',
	tags: ['!autodocs'],
	...FoundationStories.ColorPaletteMetaGenerator('sustainable-views'),
} as Meta;

export const PrimaryPalette: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/sustainable-views.js').then(
					tokens => {
						return getColorPalette(tokens.default, 'primary');
					}
				)
			);
			return {colors};
		},
	],
};

export const SecondaryPalette: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/sustainable-views.js').then(
					tokens => getColorPalette(tokens.default, 'secondary')
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
				import('@financial-times/o3-tooling-token/sustainable-views.js').then(
					tokens => getColorTints(tokens.default)
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
				import('@financial-times/o3-tooling-token/sustainable-views.js').then(
					tokens => getColorUsecases(tokens.default)
				)
			);
			return {colors};
		},
	],
};
