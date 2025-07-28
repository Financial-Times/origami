import {dirname, join} from 'path';
import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: [
		'../../../components/o3-*/stories/**/*.mdx',
		'../../../components/o3-*/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		getAbsolutePath('@storybook/addon-links'),
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-interactions'),
		'@whitespace/storybook-addon-html',
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-designs'),
		{
			name: '@storybook/addon-styling-webpack',
			options: {
				rules: [
					{
						test: /\.css$/,
						sideEffects: true,
						use: [
							require.resolve('style-loader'),
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
								},
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									implementation: require.resolve('postcss'),
									postcssOptions: {
										plugins: ['autoprefixer'],
									},
								},
							},
						],
					},
				],
			},
		},
		getAbsolutePath('@chromatic-com/storybook'),
		getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
		getAbsolutePath('storybook-addon-tag-badges'),
	],
	framework: {
		name: getAbsolutePath('@storybook/react-webpack5'),
		options: {
			builder: {useSWC: true},
		},
	},
	// Configures SWC compiler to import React automatically in story files
	swc: () => ({
		jsc: {
			transform: {
				react: {
					runtime: 'automatic',
				},
			},
		},
	}),
	docs: {
		defaultName: 'JSX Documentation',
	},
};

export default config;

function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, 'package.json')));
}
