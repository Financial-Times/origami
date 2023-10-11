#!/usr/bin/env node
import * as esbuild from 'esbuild';

const sharedConfig = {
	bundle: true,
	target: ['es6', 'chrome58', 'firefox57', 'safari11'],
	external: [
		"@financial-times/o3-web-token/*",
		"*/main.css"
	]
}

esbuild.build({
	entryPoints: ['src/css/css-brands/*.css','main.css'],
	outdir: 'build/css',
	resolveExtensions: ['.css'],
	...sharedConfig
});
