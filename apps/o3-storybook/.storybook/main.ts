import type {StorybookConfig} from "@storybook/react-webpack5"

const config: StorybookConfig = {
	stories: [
		"../../../components/o3-*/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		{
			name: "@storybook/addon-styling-webpack",
			options: {
				rules: [
					{
						test: /\.css$/,
						sideEffects: true,
						use: [
							require.resolve("style-loader"),
							{
								loader: require.resolve("css-loader"),
								options: {
									importLoaders: 1,
								},
							},
							{
								loader: require.resolve("postcss-loader"),
								options: {
									implementation: require.resolve("postcss"),
									postcssOptions: {
										plugins: ["autoprefixer"],
									},
								},
							},
						],
					},
				],
			},
		},
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
}

export default config