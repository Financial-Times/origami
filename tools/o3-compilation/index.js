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
	splitting: false,
	bundle: false,
	clean: true,
	dts: true,
}

if (existsSync('src/tsx')) {
	await build({
		...sharedConfig,
		format: ['cjs', 'esm'],
		outDir: 'build/jsx',
		entry: ['./src/tsx/*.ts(x)?'],
	})
}

if (existsSync('src/ts')) {
	await build({
		...sharedConfig,
		format: ['esm'],
		outDir: 'build/js',
		entry: ['./src/ts/index.ts'],
		bundle: true,
	})
}
