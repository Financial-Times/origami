#!/usr/bin/env node
import * as esbuild from "esbuild"

esbuild.build({
	entryPoints: ["src/css/brands/*.css", "main.css"],
	outdir: "build/css",
	resolveExtensions: [".css"],
	bundle: true,
	target: ["es6", "chrome58", "firefox57", "safari11"],
	external: ["@financial-times/*", "*/main.css"],
})
