#!/usr/bin/env node
import * as esbuild from "esbuild"
import { build } from "tsup"
import { existsSync, writeFileSync } from "fs";

esbuild.build({
	entryPoints: ["src/css/brands/*.css", "main.css"],
	outdir: "build/css",
	resolveExtensions: [".css"],
	bundle: true,
	target: ["es6", "chrome58", "firefox57", "safari11"],
	external: ["@financial-times/*", "*/main.css"],
})

const sharedConfig = {
	target: 'es2019',
	format: ['cjs', 'esm'],
	splitting: false,
	bundle: false,
	dts: true,
}

if (existsSync('src/tsx')) {
	await build({
		...sharedConfig,
		outDir: 'build/jsx',
		entry: ['./src/tsx/*.ts(x)?'],
	})
}

if (existsSync('src/ts')) {
	await build({
		...sharedConfig,
		outDir: 'build/js',
		entry: ['./src/ts/*.ts'],
	})
}
