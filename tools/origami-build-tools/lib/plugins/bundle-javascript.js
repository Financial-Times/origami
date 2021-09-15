"use strict";

const esbuild = require('esbuild');
const babel = require('@babel/core');

/**
  * Creates a bundle using `esbuild` using the `entryPointPath` as the entrypoint of the bundle.
 *
 * @param {String} entryPointPath The path where the index.js resides within.
 * @returns {Promise<String>} The bundled JavaScript as a string
 */
async function bundleJavascript(entryPointPath) {
	const bundle = await esbuild.build({
		sourcemap: 'inline',
		format: 'iife',
		target: 'es2020',
		minify: false,
		bundle: true,
		write: false,
		splitting: false,
		platform: 'browser',
		logLevel: 'silent',
		entryPoints: [entryPointPath]
	});

	const bundleString = Buffer.from(bundle.outputFiles[0].contents).toString('utf-8');

	const compiledBundle = await babel.transformAsync(bundleString, {
		presets: [require.resolve('@babel/preset-env')],
		sourceMaps: 'inline'
	});

	const bundlefinal = await esbuild.build({
		sourcemap: 'inline',
		format: 'iife',
		target: 'es5',
		minify: false,
		bundle: true,
		write: false,
		splitting: false,
		platform: 'browser',
		logLevel: 'silent',
		stdin: {
			contents: compiledBundle.code
		}
	});

	return Buffer.from(bundlefinal.outputFiles[0].contents).toString('utf-8');
}

module.exports = {
	'preprocessor:javascript': ['factory', function bundleJavaScriptFactory() {
		return async function (content, file, done) {
			const bundle = await bundleJavascript(file.path);
			done(null, bundle);
		};
	}]
};
