import fs from 'fs-extra';
import path from 'node:path';
import mergeDeep from 'merge-deep';
import { files, constructPolyfillUrl } from 'origami-tools-helpers'
import { buildSass } from './build-sass.js';
import buildJs from './build-js.js';
import mustache from 'mustache';
import { promisify } from 'node:util';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const readFile = promisify(fs.readFile);
const outputFile = promisify(fs.outputFile);

function buildDemoSass(buildConfig) {
	const src = path.join(buildConfig.cwd, '/' + buildConfig.demo.sass);
	const dest = path.join(buildConfig.cwd, '/demos/local/');

	return files.fileExists(src)
		.then(exists => {
			if (!exists) {
				const e = new Error('Sass file not found: ' + src);
				e.stack = '';
				throw e;
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

			return buildSass(sassConfig).then(css => {
				return fs.writeFile(path.join(dest, buildConfig.demo.sassDestination), css);
			});
		});
}

function buildDemoJs(buildConfig) {
	const src = path.join(buildConfig.cwd, '/' + buildConfig.demo.js);
	const destFolder = path.join(buildConfig.cwd, '/demos/local/');
	const dest = buildConfig.demo.jsDestination;
	return files.fileExists(src)
		.then(exists => {
			if (!exists) {
				const e = new Error('JavaScript file not found: ' + src);
				e.stack = '';
				throw e;
			}

			const jsConfig = {
				js: src,
				buildFolder: destFolder,
				buildJs: dest
			};

			return buildJs(jsConfig);
		});
}

function loadLocalDemoData(dataPath) {
	return readFile(dataPath, 'utf-8')
		.then(file => {
			try {
				const fileData = JSON.parse(file);
				if (typeof fileData === 'object') {
					return fileData;
				} else {
					return {};
				}
			} catch (error) {
				const e = new Error(`${dataPath} is not valid JSON.`);
				e.stack = '';
				throw e;
			}
		}, () => {
			const e = new Error(`Demo data not found: ${dataPath}`);
			e.stack = '';
			throw e;
		});
}

function loadDemoData(buildConfig) {
	if (typeof buildConfig.demo.data === 'string') {
		const dataPath = path.join(buildConfig.cwd, '/' + buildConfig.demo.data);
		return loadLocalDemoData(dataPath);
	} else if (typeof buildConfig.demo.data === 'object') {
		return Promise.resolve(buildConfig.demo.data);
	} else {
		return Promise.resolve({});
	}
}

function buildDemoHtml(buildConfig) {
	const src = path.join(buildConfig.cwd, '/' + buildConfig.demo.template);
	const partialsDir = path.dirname(src);
	const dest = path.join('demos', 'local');
	const destName = buildConfig.brand + '-' + buildConfig.demo.name + '.html';
	let data;
	let partials;
	const configuredPartials = {};

	return loadDemoData(buildConfig)
		.then(demoData => {
			data = demoData;
			return files.fileExists(src);
		})
		.then(exists => {
			if (!exists) {
				const e = new Error(`Demo template not found: ${src}`);
				e.stack = '';
				throw e;
			}

			return Promise.all([
				files.getComponentName(buildConfig.cwd),
				readFile(src, {
					encoding: 'utf8'
				})
			]);
		})
		.then(([
			moduleName,
			oDemoTpl
		]) => {
			const dependencies = buildConfig.demo.dependencies;
			// core will replace master brand, this is temporary whilst origami build service is updated to support both.
			// we're updating the o-brand component and build tools first as origami build service uses branded components
			// for integration tests.
			const brand = buildConfig.brand === 'core' ? 'master' : buildConfig.brand;
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

			return constructPolyfillUrl();
		})
		.then(polyfillUrl => {
			data.oDemoPolyfillUrl = polyfillUrl;
			return loadPartials(partialsDir);
		})
		.then(p => {
			partials = p;
			return readFile(path.join(__dirname, '/page.mustache'), 'utf-8');
		})
		.then(template => {
			const result = mustache.render(template, data, Object.assign(configuredPartials, partials));
			return outputFile(path.join(buildConfig.cwd, dest, destName), result, 'utf-8');
		});
}

function loadPartials(partialsDir) {
	const partials = {};

	// Get a list of all mustache files in a directory
	return files.getMustacheFilesList(partialsDir)
		.then(filePaths => {
			return Promise.all(filePaths.map(filePath => {
				// Calculate the partial name, which is what is used
				// to refer to it in a template. We remove the base directory,
				// replace any preceeding slashes, and remove the extension.
				const partialName = filePath.replace(partialsDir, '').replace(/^\//, '').replace(/\.mustache$/i, '');

				// Add the name/content pair to the partials map
				return readFile(filePath, {
					encoding: 'utf8'
				})
					.then(file => {
						partials[partialName] = file;
					});
			}));
		})
		.then(() => {
			return partials;
		});
}


export default async function (cfg) {
	const config = cfg || {};
	const cwd = config.cwd || process.cwd();

	// Create an array of configuration for each demo asset to build.
	const htmlBuildsConfig = [];
	const sassBuildsConfig = [];
	const jsBuildsConfig = [];
	// Create build configuration for each demo asset if it doesn't
	// already exist. For example two demos may share the same Sass.
	for (const demoBuild of demoBuildConfig) {
		const buildConfig = {
			demo: demoBuild || {},
			brand: config.brand,
			cwd: cwd
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
	// Return build promises for all demo assets.
	return Promise.all([
		...htmlBuildsConfig.map(c => buildDemoHtml(c)),
		...sassBuildsConfig.map(c => buildDemoSass(c)),
		...jsBuildsConfig.map(c => buildDemoJs(c))
	]);
};
