module.exports.managerEntries = function managerEntries(entry = []) {
	return [
		...entry,
		require.resolve("origami-storybook-preset-component-md/register"),
	]
}

module.exports.managerWebpack = function managerWebpack(baseConfig) {
	baseConfig.module.rules.push({
		test: /\.md$/,
		type: "asset/source",
	})
	return baseConfig
}
