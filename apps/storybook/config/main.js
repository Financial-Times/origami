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
}
