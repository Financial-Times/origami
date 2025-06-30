import '../../src/css/brands/whitelabel.css';
import type {Meta, StoryObj} from '@storybook/react-webpack5';
import * as FoundationStories from '../story-templates';
import {getColorPalette, getColorUsecases} from '../utils';

export default {
	title: 'Whitelabel/o3-foundation/o3-color',
	tags: ['!autodocs'],
	...FoundationStories.ColorPaletteMetaGenerator('whitelabel'),
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
