import type {StorybookConfig} from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: [
		'../../../components/o3-*/stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@whitespace/storybook-addon-html',
		'@storybook/addon-a11y',
		'@storybook/addon-designs',
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
		'@chromatic-com/storybook', // https://storybook.js.org/docs/writing-tests/visual-testing
		'@storybook/addon-webpack5-compiler-swc', // SWC compiler
	],
	framework: {
		name: '@storybook/react-webpack5',
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
		autodocs: true,
		defaultName: 'JSX Documentation',
	},
};

export default config;
