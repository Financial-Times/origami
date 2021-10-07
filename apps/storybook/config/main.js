module.exports = {
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
		// more configuration options
		config.module.rules.push({
			test: /\.(js|jsx)$/,
			loader: require.resolve("babel-loader"),
			options: {
				presets: ["@babel/preset-env", "@babel/preset-react"],
				plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"],
			},
		})
		return config
	},
}
