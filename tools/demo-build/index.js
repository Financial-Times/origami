#!/usr/bin/env node
import mergeDeep from 'merge-deep';
import { readFile, writeFile, mkdir } from 'fs/promises';
import * as path from 'node:path'
import { files } from 'origami-tools-helpers'
import { buildSass } from './build-sass.js';
import buildJs from './build-js.js';
import mustache from 'mustache';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

async function readOrigamiConfig() {
	const configPath = './origami.json';
	try {
		const file = await readFile(configPath, 'utf-8');
		let demosConfig;
		try {
			demosConfig = JSON.parse(file);
			return demosConfig;
		} catch  {
			console.error(`${configPath} is not valid JSON.`);
			process.exit(1);
		}
	} catch  {
		console.error(`No origami.json file found at ${configPath}`);
		process.exit(1);
	}
}

function hasDemos(origamiConfig) {
	return Array.isArray(origamiConfig.demos) && origamiConfig.demos.length;
}

function getBrands(origamiConfig) {
	const hasBrandsDefined = origamiConfig && origamiConfig.brands && Array.isArray(origamiConfig.brands) && origamiConfig.brands.length > 0;
	if (hasBrandsDefined) {
		return origamiConfig.brands;
	} else {
		return ["core", "internal", "whitelabel"];
	}
}

function getComponentDefaultDemoConfig(origamiConfig) {
	if (origamiConfig && origamiConfig.demosDefaults && typeof origamiConfig.demosDefaults === 'object') {
		return origamiConfig.demosDefaults;
	}
	return {};
}

function hasUniqueNames(demos) {
	const names = new Set;
	for (let i = 0; i < demos.length; i++) {
		if (names.has(demos[i].name)) {
			return false;
		}
		names.add(demos[i].name);
	}
	return true;
}

async function buildDemoSass(buildConfig) {
	const src = path.join(buildConfig.cwd, '/' + buildConfig.demo.sass);
	const dest = path.join(buildConfig.cwd, '/demos/local/');

	const exists = await files.fileExists(src);
	if (!exists) {
		console.error('Sass file not found: ' + src);
		process.exit(1);
	}

	const sassConfig = {
		sass: src,
		// For the Sass files to load correctly, they need to be in one of these two directories.
		// Sass doesn't look in subdirectories and we can't use wildcards
		sassIncludePaths: ['demos/src', 'demos/src/scss'],
		sourcemaps: true,
		buildCss: path.basename(buildConfig.demo.sass).replace('.scss', '.css'),
		buildFolder: dest,
		cwd: buildConfig.cwd,
		brand: buildConfig.brand
	};

	const css = await buildSass(sassConfig);
	return writeFile(path.join(dest, buildConfig.demo.sassDestination), css);
}

async function buildDemoJs(buildConfig) {
	const src = path.join(buildConfig.cwd, '/' + buildConfig.demo.js);
	const destFolder = path.join(buildConfig.cwd, '/demos/local/');
	const dest = buildConfig.demo.jsDestination;
	const exists = await files.fileExists(src);
	if (!exists) {
		console.error('JavaScript file not found: ' + src);
		process.exit(1);
	}

	const jsConfig = {
		js: src,
		buildFolder: destFolder,
		buildJs: dest
	};

	return buildJs(jsConfig);
}

async function loadLocalDemoData(dataPath) {
	try {
		const file = await readFile(dataPath, 'utf-8');
		try {
			const fileData = JSON.parse(file);
			if (typeof fileData === 'object') {
				return fileData;
			} else {
				return {};
			}
		} catch (error) {
			console.error(`${dataPath} is not valid JSON.`);
			process.exit(1);
		}
	} catch {
		console.error(`Demo data not found: ${dataPath}`);
		process.exit(1);
	}
}

async function loadDemoData(buildConfig) {
	if (typeof buildConfig.demo.data === 'string') {
		const dataPath = path.join(buildConfig.cwd, '/' + buildConfig.demo.data);
		return loadLocalDemoData(dataPath);
	} else if (typeof buildConfig.demo.data === 'object') {
		return buildConfig.demo.data;
	} else {
		return {};
	}
}

async function buildDemoHtml(buildConfig) {
	const src = path.join(buildConfig.cwd, buildConfig.demo.template);
	const partialsDir = path.dirname(src);
	const dest = path.join('demos', 'local');
	await mkdir(dest, {recursive: true});
	const destName = buildConfig.brand + '-' + buildConfig.demo.name + '.html';
	let data;
	let partials;
	const configuredPartials = {};

	data = await loadDemoData(buildConfig)
	const exists = await files.fileExists(src);
	if (!exists) {
		console.error(`Demo template not found: ${src}`);
		process.exit(1);
	}

	const [
		moduleName,
		oDemoTpl
	] = await Promise.all([
		files.getComponentName(buildConfig.cwd),
		readFile(src, {
			encoding: 'utf8'
		})
	]);
	const dependencies = buildConfig.demo.dependencies;
	// core will replace master brand, this is temporary whilst origami build service is updated to support both.
	// we're updating the o-brand component and build tools first as origami build service uses branded components
	// for integration tests.
	const brand = buildConfig.brand;
	data.oDemoTitle = moduleName + ': ' + buildConfig.demo.name + ' demo';
	data.oDemoDocumentClasses = buildConfig.demo.documentClasses || buildConfig.demo.bodyClasses;

	data.oDemoComponentStylePath = buildConfig.demo.sassDestination ?
		path.basename(buildConfig.demo.sassDestination) :
		'';

	data.oDemoComponentScriptPath = buildConfig.demo.jsDestination ? path.basename(buildConfig.demo.jsDestination) : '';

	data.oDemoDependenciesStylePath = dependencies ?
		`https://www.ft.com/__origami/service/build/v3/bundles/css?system_code=origami-registry-ui&components=${dependencies.toString()}${brand ? `&brand=${brand}` : ''}` :
		'';

	data.oDemoDependenciesScriptPath = dependencies ?
		'https://www.ft.com/__origami/service/build/v3/bundles/js?system_code=origami-registry-ui&components=' + dependencies.toString() :
		'';

	configuredPartials.oDemoTpl = String(oDemoTpl);

	partials = await loadPartials(partialsDir);
	const template = await readFile(path.join(__dirname, '/page.mustache'), 'utf-8');
	const result = mustache.render(template, data, Object.assign(configuredPartials, partials));
	return writeFile(path.join(buildConfig.cwd, dest, destName), result, 'utf-8');
}

async function loadPartials(partialsDir) {
	const partials = {};

	// Get a list of all mustache files in a directory
	const filePaths = await files.getMustacheFilesList(partialsDir);
	await Promise.all(filePaths.map(async filePath => {
		// Calculate the partial name, which is what is used
		// to refer to it in a template. We remove the base directory,
		// replace any preceeding slashes, and remove the extension.
		const partialName = filePath.replace(partialsDir, '').replace(/^\//, '').replace(/\.mustache$/i, '');

		// Add the name/content pair to the partials map
		const file = await readFile(filePath, 'utf8')
		partials[partialName] = file;
	}));

	return partials;
}

const cwd = process.cwd();
const origamiConfig = await readOrigamiConfig();

if (!hasDemos(origamiConfig)) {
	console.error(`No demos exist in the origami.json file. Reference https://origami.ft.com/documentation/manifests/origami-json/ to configure demos in the component's origami.json manifest file.`);
	process.exit(0);
}

const demos = origamiConfig.demos;

if (!hasUniqueNames(demos)) {
	console.error('Demos with the same name were found. Give them unique names and try again.');
	process.exit(1);
}

console.log('demo-build: Starting building demos');

function demoSupportsBrand(demoConfig, brand) {
	const isNotBrandSpecificDemo = !demoConfig.brands || demoConfig.brands.length === 0;
	if (isNotBrandSpecificDemo) {
		return true;
	} else {
		return demoConfig.brands.includes(brand);
	}
}

const brands = await getBrands(origamiConfig);
for (const brand of brands) {
	const demoDefaultConfiguration = getComponentDefaultDemoConfig(origamiConfig);
	const demoBuildConfig = [];

	for (const demoConfig of demos) {
		if (demoSupportsBrand(demoConfig, brand)) {
			demoBuildConfig.push(mergeDeep(
				{
					documentClasses: '',
					description: ''
				},
				demoDefaultConfiguration,
				demoConfig
			));
		}
	}
	// Create an array of configuration for each demo asset to build.
	const htmlBuildsConfig = [];
	const sassBuildsConfig = [];
	const jsBuildsConfig = [];
	// Create build configuration for each demo asset if it doesn't
	// already exist. For example two demos may share the same Sass.
	for (const demoBuild of demoBuildConfig) {
		const buildConfig = {
			demo: demoBuild || {},
			brand,
			cwd
		};

		// Add demo html config.
		htmlBuildsConfig.push(buildConfig);
		const newSassBuild = !sassBuildsConfig.find(existingConfig =>
			existingConfig.demo.sass === buildConfig.demo.sass
		);
		if (demoBuild.sass) {
			demoBuild.sassDestination = buildConfig.brand + '-' + path.basename(demoBuild.sass).replace('.scss', '.css');
			if (newSassBuild) {
				sassBuildsConfig.push(buildConfig);
			}
		}

		const newJsBuild = !jsBuildsConfig.find(existingConfig =>
			existingConfig.demo.js === buildConfig.demo.js
		);
		if (demoBuild.js) {
			demoBuild.jsDestination = buildConfig.brand + '-' + path.basename(demoBuild.js);
			if (newJsBuild) {
				jsBuildsConfig.push(buildConfig);
			}
		}
	}

	await Promise.all([
		...htmlBuildsConfig.map(c => buildDemoHtml(c)),
		...sassBuildsConfig.map(c => buildDemoSass(c)),
		...jsBuildsConfig.map(c => buildDemoJs(c)),
	])
}

console.log('demo-build: Building demos complete. No errors found.');
