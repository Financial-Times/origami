import type { StorybookConfig } from "@storybook/react-webpack5"

const config: StorybookConfig = {
	stories: [
		"../../../components/o3-*/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
		`../../../components/**/stories/*.stories.@(mdx|js|jsx|ts|tsx)`,
		`../../../components/**/stories/core/*.stories.@(mdx|js|jsx|ts|tsx)`,
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-designs",
		"origami-storybook-addon-html/register",
		"@whitespace/storybook-addon-html",
		"@storybook/addon-styling-webpack",
		({
			name: "@storybook/addon-styling-webpack",

			options: {
				rules: [{
					test: /\.css$/,
					sideEffects: true,
					use: [
						require.resolve("style-loader"),
						{
							loader: require.resolve("css-loader"),
							options: {


							},
						},
					],
				}, {
					test: /\.scss$/,
					use: [
						require.resolve("style-loader"),
						require.resolve("css-loader"),
						{
							loader: require.resolve("sass-loader"),
							options: {


								sassOptions: {
									includePaths: ["../../node_modules"],
								},
								additionalData: content => {
									return (
										`
												$system-code: origami;
												$o-brand: core;
												@import "@financial-times/o-colors/main";
												@include oColors();
											` + content
									)
								},
							},
						},
					],
				},],
			}
		})
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
