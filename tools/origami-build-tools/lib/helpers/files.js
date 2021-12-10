'use strict';

const { readFile, access } = require('fs/promises');
const { constants } = require('fs');
const path = require('path');
const denodeify = require('util').promisify;
const deglob = denodeify(require('deglob'));

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

function getBuildFolderPath(cwd) {
	cwd = cwd || process.cwd();
	return path.join(cwd, '/build/');
}

function requireIfExists(filePath) {
	return readIfExists(filePath)
		.then(file => {
			return file ? JSON.parse(file) : undefined;
		});
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

function getPackageJson(cwd) {
	cwd = cwd || process.cwd();
	return requireIfExists(path.join(cwd, '/package.json'));
}

function packageJsonExists(cwd) {
	return fileExists(path.join(cwd || process.cwd(), '/package.json'));
}

function packageLockJsonExists(cwd) {
	return fileExists(path.join(cwd || process.cwd(), '/package-lock.json'));
}

function getOrigamiJson(cwd) {
	cwd = cwd || process.cwd();
	return requireIfExists(path.join(cwd, '/origami.json'));
}

function getMainSassPath(cwd) {
	cwd = cwd || process.cwd();
	const sassMainPath = path.join(cwd, '/main.scss');
	return Promise.resolve(sassMainPath);
}

function getMainJsPath(cwd) {
	cwd = cwd || process.cwd();
	return getPackageJson(cwd)
		.then(pkgJson => {
			if (pkgJson) {
				if (typeof pkgJson.browser === 'string') {
					return path.join(cwd, pkgJson.browser);
				} else if (typeof pkgJson.main === 'string') {
					return path.join(cwd, pkgJson.main);
				}
			}
			return null;
		});
}

function getComponentName(cwd) {
	return getPackageJson(cwd)
		.then(pkgJson => {
			if (pkgJson) {
				const packageName = pkgJson.name;
				return packageName ? packageName.split('/').pop() : packageName;
			}
			return '';
		});
}

function getModuleBrands(cwd) {
	return getOrigamiJson(cwd)
		.then(origamiJson => {
			const hasBrandsDefined = origamiJson && origamiJson.brands && Array.isArray(origamiJson.brands) && origamiJson.brands.length > 0;
			if (hasBrandsDefined) {
				return origamiJson.brands;
			}
			return ['core', 'internal', 'whitelabel'];
		});
}

/**
 * Get individual demo configuration for the component.
 * @param {string} cwd - The component's directory (the current working directory).
 * @return {Promise<Array<object>>} - An array of objects representing a component demo.
 */
async function getComponentDemos(cwd) {
	const origamiJson = await getOrigamiJson(cwd);
	if (origamiJson && origamiJson.demos && Array.isArray(origamiJson.demos)) {
		return origamiJson.demos;
	}
	return [];
}

/**
 * Get shared demo configuration.
 * @param {string} cwd - The component's directory (the current working directory).
 * @return {object} - An object of configuration.
 */
async function getComponentDefaultDemoConfig(cwd) {
	const origamiJson = await getOrigamiJson(cwd);
	if (origamiJson && origamiJson.demosDefaults && typeof origamiJson.demosDefaults === 'object') {
		return origamiJson.demosDefaults;
	}
	return {};
}

// List mustache files in a directory, recursing over subdirectories
function getMustacheFilesList(basePath) {
	const opts = {
		useGitIgnore: true,
		usePackageJson: false,
		cwd: basePath
	};

	return deglob(['**/**.mustache'], opts);
}

function getSassFilesList(cwd) {
	const opts = {
		useGitIgnore: true,
		usePackageJson: false,
		cwd: cwd || process.cwd()
	};

	return deglob(['**/**.scss', '**/**.sass'], opts);
}

function getSassTestFiles(cwd) {
	const opts = {
		usePackageJson: false,
		cwd: cwd || process.cwd()
	};

	return deglob([`test/scss/**/**.test.scss`, `test/scss/**.test.scss`], opts);
}

/**
 * @param {String} cwd - Current working directory of the project with Sass.
 * @param {Object} [config] - Configuration for Sass paths to include.
 * @param {Array<String>|Undefined} config.sassIncludePaths - Extra Sass paths to include.
 * @return {Array<String>} - Sass paths.
 */
function getSassIncludePaths (cwd, config = {sassIncludePaths: []}) {
	const npmPaths = [
		path.join('..', '..', 'node_modules'),
		'node_modules',
		path.join('node_modules', '@financial-times')
	];

	return [cwd].concat([
		...config.sassIncludePaths || [],
		...npmPaths
	].map(pathname => path.join(cwd, pathname)));
}

module.exports.fileExists = fileExists;
module.exports.readIfExists = readIfExists;
module.exports.getBuildFolderPath = getBuildFolderPath;
module.exports.getMainSassPath = getMainSassPath;
module.exports.getOrigamiJson = getOrigamiJson;
module.exports.getMainJsPath = getMainJsPath;
module.exports.getPackageJson = getPackageJson;
module.exports.packageJsonExists = packageJsonExists;
module.exports.packageLockJsonExists = packageLockJsonExists;
module.exports.getComponentName = getComponentName;
module.exports.getSassFilesList = getSassFilesList;
module.exports.getMustacheFilesList = getMustacheFilesList;
module.exports.getSassTestFiles = getSassTestFiles;
module.exports.getModuleBrands = getModuleBrands;
module.exports.getComponentDemos = getComponentDemos;
module.exports.getComponentDefaultDemoConfig = getComponentDefaultDemoConfig;
module.exports.getSassIncludePaths = getSassIncludePaths;
