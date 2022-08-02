const { readFile, access } = require('node:fs/promises');
const {constants } = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const globby = require('globby');

const brand = process.env.ORIGAMI_STORYBOOK_BRAND || "core";
/**
 * Node.JS no longer has an fs.exists method.
 * Instead we use the fs.access method and check we can read the file.
 * fs.access will throw an error if the file does not exist.
 * @param {string} file file-system path to the file you are wanting to check exists or not
 * @returns {Promise.<boolean>} Whether the file exists
*/
async function fileExists(file) {
	try {
		await access(file, constants.R_OK);
		return true;
	} catch (error) {
		return false;
	}
}

function readIfExists(filePath) {
	return fileExists(filePath)
		.then(exists => {
			if (exists) {
				return readFile(filePath, 'utf-8');
			} else {
				return undefined;
			}
		});
}

function requireIfExists(filePath) {
	return readIfExists(filePath)
		.then(file => {
			return file ? JSON.parse(file) : undefined;
		});
}

function getOrigamiJson(cwd) {
	cwd = cwd || process.cwd();
	return requireIfExists(path.join(cwd, '/origami.json'));
}


function getComponentBrands(cwd) {
	return getOrigamiJson(cwd)
		.then(origamiJson => {
			const hasBrandsDefined = origamiJson && origamiJson.brands && Array.isArray(origamiJson.brands) && origamiJson.brands.length > 0;
			if (hasBrandsDefined) {
				return origamiJson.brands;
			}
			return ['core', 'internal', 'whitelabel'];
		});
}

module.exports.core = {
	builder: "webpack5",
	options: {
        lazyCompilation: true,
      },
}

module.exports.stories = (async () => {
	const storyPaths = [
		"../stories/**/*.stories.mdx",
		"../stories/**/*.stories.@(js|jsx|ts|tsx)"
	];

	const componentDirectories = await globby(['../../components/**'], {
		gitignore: false,
		expandDirectories: false,
		onlyDirectories: true,
		deep: 1,
	});

	for (const componentDirectory of componentDirectories) {
		const brands = await getComponentBrands(componentDirectory);
		const storiesForBrand = brands.includes(brand) ? await globby([`${componentDirectory}/stories/**/*.stories.@(mdx|js|jsx|ts|tsx)`], {
			gitignore: false,
			expandDirectories: false,
			deep: 1,
		}) : [];
		storyPaths.push(...storiesForBrand.map(storyPath => `../${storyPath}`));
	}

	return storyPaths;
})();

module.exports.addons = [
	"@storybook/addon-essentials",
	"@storybook/addon-a11y",
	"@storybook/addon-links",
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
							$o-brand: ${brand};
							@import "@financial-times/o-colors/main";
							@include oColors();
						` + content
					)
				},
			},
		},
	},
	"storybook-addon-designs",
	"origami-storybook-addon-html/register",
	"origami-storybook-addon-guidelines/register",
	"origami-storybook-addon-markdown-tabs",
	"origami-storybook-addon-background",
]

module.exports.typescript = {
	check: false,
	checkOptions: {},
	reactDocgen: "react-docgen-typescript",
	reactDocgenTypescriptOptions: {
		shouldExtractLiteralValuesFromEnum: true,
	},
}

module.exports.webpackFinal = async function webpackFinal(config) {
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
}


module.exports.env = (config) => ({
    ...config,
	ORIGAMI_STORYBOOK_BRAND: brand
})

module.exports.features = {
	buildStoriesJson: true
}
