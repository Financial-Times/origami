module.exports = {
	core: {
		builder: "webpack5",
	},
	stories: [
		"../stories/**/*.stories.mdx",
		"../stories/**/*.stories.@(js|jsx|ts|tsx)",
		"../../../components/*/stories/**/*.stories.mdx",
		"../../../components/*/stories/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		{
			name: "@storybook/preset-scss",
			options: {
				sassLoaderOptions: {
					sassOptions: {
						includePaths: ["../../node_modules"],
					},
					additionalData: content => {
						return (
							`
							$system-code: origami;
							$o-brand: ${process.env.ORIGAMI_STORYBOOK_BRAND || "master"};
							@import "@financial-times/o-colors/main";
							@include oColors();
						` + content
						)
					},
				},
			},
		},
		"storybook-addon-designs",
		"@storybook/addon-notes/register",
		"origami-storybook-addon-html/register",
		"origami-storybook-addon-guidelines/register",
		"origami-storybook-addon-component-md/register",
	],
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
		},
	},
	webpackFinal: async config => {
		// i've had to add all this because for some reason storybook doesn't
		// understand jsx on heroku unless i do ???
		config.module.rules.push({
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: [
				{
					loader: require.resolve("babel-loader"),
					options: {
						presets: [
							require("@babel/preset-typescript").default,
							[
								require("@babel/preset-react").default,
								{
									runtime: "automatic",
								},
							],
							require("@babel/preset-env").default,
						],
					},
				},
				require.resolve("react-docgen-typescript-loader"),
			],
		})
		config.resolve.extensions.push(".ts", ".tsx")
		return config
	},
}
