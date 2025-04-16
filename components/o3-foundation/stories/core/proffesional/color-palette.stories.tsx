import type {Meta, StoryObj} from '@storybook/react';
import * as TypographyStories from '../../story-templates';
import {
	getColorPalette,
	getColors,
	getColorTints,
	getColorUsecases,
} from '../../utils';

export default {
	title: 'Core/Professional/o3-foundation/o3-color',
	tags: ['!autodocs'],
	...TypographyStories.ColorPaletteMetaGenerator('professional'),
} as Meta;

export const PrimaryPalette: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/professional.js').then(
					tokens => {
						return getColorPalette(tokens.default, 'primary');
					}
				)
			);
			return {colors};
		},
	],
	// TO DO: OR-838 uncomment this after new version of @financial-times/o3-figma-sb-link is released
	// design: {
	// 	type: 'figma',
	// 	url: links[`${brand}-o3-foundation-o3-color--primary-palette`].figma,
	// },
};

export const SecondaryPalette: StoryObj = {
	loaders: [
		async () => {
			const colors = await Promise.resolve(
				import('@financial-times/o3-tooling-token/professional.js').then(
					tokens => getColorPalette(tokens.default, 'secondary')
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
				import('@financial-times/o3-tooling-token/professional.js').then(
					tokens => getColorPalette(tokens.default, 'tertiary')
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
				import('@financial-times/o3-tooling-token/professional.js').then(
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
				import('@financial-times/o3-tooling-token/professional.js').then(
					tokens => getColorUsecases(tokens.default)
				)
			);
			return {colors};
		},
	],
};
