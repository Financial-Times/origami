#!/usr/bin/env node
import * as esbuild from 'esbuild';
import {build} from 'tsup';
import {existsSync, readdirSync, readFileSync, writeFileSync, unlinkSync} from 'fs';
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
	splitting: true,
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
	await Promise.all(['cjs', 'esm'].map(async format => {
		await build({
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

// tsup generates .d.mts files, but we need .d.ts files for esm and browser bundle
const renameAndReplaceTypeImports = (folder) => {
	if (!existsSync(folder)) {
		return;
	}
	const files = readdirSync(folder);
	for (const file of files) {
		if (file.endsWith('.d.mts')) {
			const filePath = path.join(folder, file);
			const content = readFileSync(filePath, 'utf-8');
			const updatedContent = content.replace(/\.mjs/g, '.js');
			const newFilePath = filePath.replace('.d.mts', '.d.ts');
			writeFileSync(newFilePath, updatedContent);
			unlinkSync(filePath);
		}
	}
};

if (existsSync('src/types')) {
	renameAndReplaceTypeImports('browser');
	renameAndReplaceTypeImports('esm');
}