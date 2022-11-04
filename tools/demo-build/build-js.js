import esbuild from "esbuild";
import path from "node:path";
import { files } from "origami-tools-helpers";
import * as fs from "fs-extra";
import babel from "@babel/core";
import presetenv from "@babel/preset-env";

export default async function (cfg) {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	let src;
	if (config.js) {
		src = config.js;
	} else {
		src = await files.getMainJsPath();
	}

	if (src) {
		const builtFileName = config.buildJs ? config.buildJs : "main.js";
		const destFolder = config.buildFolder
			? config.buildFolder
			: files.getBuildFolderPath();

		const esbuildResult = await esbuild.build({
			entryPoints: [src],
			sourcemap: "inline",
			bundle: true,
			write: false,
		});

		const bundle = esbuildResult.outputFiles[0]
			? esbuildResult.outputFiles[0].text
			: "";

		const { code: compiledBundle } = await babel.transform(bundle, {
			configFile: false,
			envName: "development",
			presets: [
				[
					presetenv,
					{
						// https://docs.google.com/document/d/1z6kecy_o9qHYIznTmqQ-IJqre72jhfd0nVa4JMsS7Q4/
						targets: {
							safari: "11",
							ios: "9",
							ie: "11",
							samsung: "9",
						},
					},
				],
			],
			inputSourceMap: true,
			sourceMaps: "inline",
			sourceFileName: path.basename(src),
			sourceRoot: path.dirname(src),
			sourceType: "script",
		});

		await fs.outputFile(
			path.join(destFolder, builtFileName),
			compiledBundle,
			"utf-8"
		);
		return compiledBundle;
	}
}
