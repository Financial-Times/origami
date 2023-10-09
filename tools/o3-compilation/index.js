#!/usr/bin/env node
import * as esbuild from 'esbuild';

esbuild.build({
	entryPoints: ['src/css/css-brands/*.css'],
	bundle: true,
	outdir: 'build/css/',
	plugins: [],
	external: [
		"@financial-times/o3-web-token/*",
		"./main.css"
	]
});
