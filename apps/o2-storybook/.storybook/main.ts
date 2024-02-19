import { promises, constants } from 'fs';
const { access, readFile } = promises;
import {globby} from "globby";
import path from "path";
import type {StorybookConfig} from "@storybook/react-webpack5"

const brand = process.env.ORIGAMI_STORYBOOK_BRAND || "core"


const config: StorybookConfig = {
	stories: (async () => {
		const storyPaths = []

		let componentDirectories = await globby(
			["../../components/**", "!../../components/o3-*/**", "../../libraries/**"],
			{
				gitignore: false,
				expandDirectories: false,
				onlyDirectories: true,
				deep: 1,
			}
		)

		for (const componentDirectory of componentDirectories) {
			const brands = await getComponentBrands(componentDirectory);
			const storiesForBrand = brands.includes(brand)
				? await globby(
					[
						`${componentDirectory}/stories/*.stories.@(mdx|js|jsx|ts|tsx)`,
						`${componentDirectory}/stories/${brand}/*.stories.@(mdx|js|jsx|ts|tsx)`,
					],
					{
						gitignore: false,
						expandDirectories: false,
						deep: 1,
					}
				)
				: []
			storyPaths.push(...storiesForBrand.map(storyPath => `../${storyPath}`))
		}

		return storyPaths
	})(),
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
		"@storybook/addon-docs",
		"@storybook/addon-styling-webpack",
		{
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
				},
				{
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
												$o-brand: ${brand};
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
		},
		"@whitespace/storybook-addon-html"
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	docs: {
		autodocs: "tag",
	}
}


const getComponentBrands = componentDir => getOrigamiJson(componentDir).then(origamiJson => {
	const hasBrandsDefined =
		origamiJson &&
		origamiJson.brands &&
		Array.isArray(origamiJson.brands) &&
		origamiJson.brands.length > 0
	if (hasBrandsDefined) {
		return origamiJson.brands
	}
	return ["core", "internal", "whitelabel"]
});

const getOrigamiJson = componentDir => {
	componentDir = componentDir || process.cwd()

	return requireIfExists(path.join(componentDir, "/origami.json"))
};

const requireIfExists = filePath => {
	return readIfExists(filePath).then(file => {
		return file ? JSON.parse(file) : undefined
	})
};

const fileExists = async file => {
	try {
		await access(file, constants.R_OK)
		return true
	} catch (error) {
		return false
	}
};

const readIfExists = filePath => fileExists(filePath).then(exists => {
	if (exists) {
		return readFile(filePath, "utf-8")
	} else {
		return undefined
	}
});
export default config
