'use strict';

const path = require('path');
const fs = require('fs-extra');
const denodeify = require('util').promisify;
const readFile = denodeify(fs.readFile);
const outputFile = denodeify(fs.outputFile);
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const ftSass = require('../helpers/sass');
const execa = require('execa');
const files = require('../helpers/files');
const log = require('../helpers/log');

/**
 *
 * @param {String} sassFile - The file to return Sass from.
 * @param {Object} config - Configuration to augment Sass.
 * @param {String|Undefined} config.brand [undefined] - The brand the Sass is for .e.g. "core", "internal", or "whitelabel".
 * @param {String} config.sassPrefix [''] - Sass to prefix the Sass from file with.
 * @return {Promise<String>} - The sass from the file, with extra Sass variables and prefixes according to configuration.
 */
function getSassData(sassFile, config = {
	brand: undefined,
	sassPrefix: ''
}) {
	// Set Sass system code variable `$system-code`.
	const sassSystemCodeVariable = '$system-code: "origami-build-tools";';
	// Set Sass brand variable `$o-brand`, given as an obt argument.
	const sassBrandVariable = config.brand ? `$o-brand: ${config.brand};` : '';
	const sassPrefix = config.sassPrefix ? config.sassPrefix : '';
	return readFile(sassFile, 'utf-8').then(code =>
		sassSystemCodeVariable + sassBrandVariable + sassPrefix + code
	);
}

/**
 * Build Sass and return CSS.
 *
 * @param {Object} [config] - Configuration to build sass.
 * @param {String} [config.cwd] - The working directory to resolve assets paths.
 * @param {String} [config.sass] ['main.scss'] - The Sass file to build.
 * @param {String} [config.buildFolder] ['/build'] - The destination for build assets. Either a directory or "disabled", to never write build css to file.
 * @param {String} [config.buildCss] ['main.css'] - The destination filename.
 * @param {Boolean} [config.sourcemaps] [true] - Whether to include inline sourcemaps.
 * @param {String|Undefined} [config.brand] [undefined] - The brand the Sass build is for .e.g.  "core", "internal", or "whitelabel".
 * @param {String|Undefined} [config.sassPrefix] [undefined] - Sass to prefix the Sass from file with.
 * @param {String} [config.outputStyle] ['expanded'] - The Sass output style. One of `compressed` (removes as many extra characters as possible) or `expanded` (writes each selector and declaration on its own line).
 * @param {String[]} [config.sassIncludePaths] - Extra Sass paths to includes.
 * @return {Promise<String>} - The built css.
 */
module.exports = function buildSass(config) {
	config = config || {};
	const cwd = config.cwd || process.cwd();
	const src = config.sass ? Promise.resolve(config.sass) : files.getMainSassPath(cwd);

	return src.then(sassFile => {
		if (sassFile) {
			const destFolder = config.buildFolder || files.getBuildFolderPath(cwd);
			const dest = config.buildCss || 'main.css';
			const useSourceMaps = typeof config.sourcemaps === 'boolean' ?
				config.sourcemaps :
				true;
			const sassData = getSassData(sassFile, {
				brand: config.brand,
				sassPrefix: config.sassPrefix,
			});

			return Promise.resolve(sassData)
				.then(sassData => {

					const sassArguments = [];
					// Load Sass from standard input
					sassArguments.push('--stdin');
					// Set Sass include paths (i.e. npm paths)
					sassArguments.push(
						...files.getSassIncludePaths(cwd, config).map(p => `--load-path=${p}`)
					);
					// Set CSS output style. Expanded by default
					sassArguments.push(`--style=${config.outputStyle || 'expanded'}`);
					// Configure sourcemaps
					sassArguments.push(...useSourceMaps ?
						['--embed-source-map', '--source-map-urls=absolute'] :
						['--no-source-map'],
					);
					// Build Sass
					let result = '';
					try {
						result = execa.sync(ftSass, sassArguments, {
							input: sassData,
							cwd: path.dirname(sassFile)
						});
						// Output Sass debug logs and warnings
						if (result.stderr) {
							log.secondary(result.stderr);
						}
					} catch (error) {
						const stderr = error.stderr || '';
						let errorMessage = `Failed building Sass:\n' ${stderr}\n`;
						// Find where the Sass error occurred from stderr.
						const errorLineMatch = stderr.match(/(?:[\s]+)?(.+.scss)(?:[\s]+)([0-9]+):([0-9]+)/);
						// If we know where the Sass error occurred, provide an absolute uri.
						if (errorLineMatch) {
							const [
								,
								file,
								line,
								column
							] = errorLineMatch;
							errorMessage = errorMessage +
								`\n${path.join(cwd, file)}:${line}:${column}\n`;
						}
						// Forward Sass error.
						throw new Error(errorMessage);
					}

					return result.stdout;
				}).then(css => {
					// postcss does not parse the charset unless it is also base64.
					// TODO: Remove the charset as a workaround, and remove this code
					// when postcss release a fix.
					// https://github.com/postcss/postcss/issues/1281#issuecomment-599626666
					css = css.replace(
						`application/json;charset=utf-8,`,
						`application/json,`
					);

					const postCssTransforms = [];

					// Configure postcss autoprefixer transform
					postCssTransforms.push(autoprefixer({
						overrideBrowserslist: [
							'> 1%',
							'last 2 versions',
							'ie >= 11',
							'ff ESR',
							'safari >= 9'
						],
						cascade: false,
						flexbox: 'no-2009',
						grid: true
					}));

					// Set postcss options
					const postCssOptions = useSourceMaps ? {
						from: sassFile,
						to: dest,
						map: { inline: true }
					} : {from: undefined};

					// Run postcss
					try {
						return postcss(postCssTransforms).process(css, postCssOptions);
					} catch(error) {
						throw new Error(
							`Failed building Sass: postcss threw an error.\n` +
							error.message
						);
					}
				}).then(postcssResult => {
					function cssOnlyHasComments(css) {
						const cssComments = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g;
						const cssWithoutComments = css.replace(cssComments, '');
						return cssWithoutComments.trim().length === 0;
					}
					const css = cssOnlyHasComments(postcssResult.css) ? '' : postcssResult.css;
					// Return css after writing to file if a destination
					// directory is given.
					if (destFolder !== 'disabled') {
						return outputFile(path.join(destFolder, dest), css).then(() => css);
					}
					// Otherwise just return the css.
					return css;
				});
		}
	});
};

module.exports.getSassData = getSassData;
