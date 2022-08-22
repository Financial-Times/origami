const brand = process.env.ORIGAMI_STORYBOOK_BRAND || "core"

module.exports.managerEntries = function managerEntries(entry = []) {
	return [
		...entry,
		require.resolve("origami-storybook-addon-markdown-tabs/register"),
	]
}

module.exports.managerWebpack = function managerWebpack(baseConfig) {
	baseConfig.output.publicPath = `/brands/${brand}/`
	baseConfig.module.rules.push({
		test: /\.md$/,
		type: "asset/source",
	})
	baseConfig.module.rules.push({
		test: /\.s[ca]ss$/,
		use: ["style-loader", "css-loader", "sass-loader"],
	})
	return baseConfig
}
