import type {Meta, StoryObj} from '@storybook/react';
import * as TypographyStories from '../story-templates';
import {
	getColorPalette,
	getColors,
	getColorTints,
	getColorUsecases,
} from '../utils';

export default {
	title: 'Whitelabel/o3-foundation/o3-color',
	tags: ['!autodocs'],
	...TypographyStories.ColorPaletteMetaGenerator('whitelabel'),
} as Meta;

export const Palette: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/whitelabel.js').then(
					tokens => {
						return getColorPalette(tokens.default, undefined, true);
					}
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
				import('@financial-times/o3-tooling-token/whitelabel.js').then(tokens =>
					getColorUsecases(tokens.default)
				)
			);
			return {colors};
		},
	],
};

export const ContrastRationChecker: StoryObj = {
	...TypographyStories.ContrastRatioCheckerMetaGenerator('whitelabel'),
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/whitelabel.js').then(tokens =>
					getColors(tokens.default, true)
				)
			);
			return {colors};
		},
	],
};
