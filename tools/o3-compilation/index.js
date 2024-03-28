#!/usr/bin/env node
import * as esbuild from 'esbuild';
import {build} from 'tsup';
import {existsSync, readdirSync, readFileSync, writeFileSync} from 'fs';
import path from 'path';

(async () => {
	const sharedConfig = {
		target: ['es6', 'chrome58', 'firefox57', 'safari11'],
		external: ['@financial-times/*', '*/main.css'],
		resolveExtensions: ['.css'],
		outdir: 'css',
		bundle: true,
	};

	await Promise.all([
		// build brand files
		await esbuild.build({
			...sharedConfig,
			entryPoints: ['src/css/brands/*.css'],
		}),
		// build main.css
		await esbuild.build({
			...sharedConfig,
			entryPoints: ['main.css'],
		})
	])

	// change main.css imports to correct root import
	const brandCssFiles = readdirSync('css');
	for (const brandCssFile of brandCssFiles) {
		const cssFile = path.join('css', brandCssFile);
		const brandCss = readFileSync(cssFile, 'utf-8');
		// replace main import with correct root import
		const updatedBrandCss = brandCss.replace(
			/@import ".+main\.css";/g,
			'@import "./main.css";'
		);
		writeFileSync(`css/${brandCssFile}`, updatedBrandCss);
	}
})();

const sharedConfig = {
	target: 'es2021',
	splitting: false,
	bundle: false,
	clean: true,
	dts: true,
	outExtension: () => {
		return {
			js: `.js`,
		}
	},
};

if (existsSync('src/tsx')) {
	await Promise.all(['cjs', 'esm'].map(format => {
		build({
			...sharedConfig,
			format,
			outDir: `${format}/`,
			entry: ['./src/tsx/*.ts(x)?'],
		});
	}))
}

if (existsSync('src/ts')) {
	await build({
		...sharedConfig,
		format: ['esm'],
		outDir: 'browser',
		entry: ['./src/ts/index.ts'],
		bundle: true,
	});
}
