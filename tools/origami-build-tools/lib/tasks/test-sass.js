"use strict";

const commandLine = require("../helpers/command-line");
const files = require("../helpers/files");
const { writeFile, unlink } = require("fs/promises");
const path = require("path");

const trueTest = function(config, task) {
	const testRunner = path.join(config.cwd, "test/scss/test-runner.js");
	const testRunnerDirectory = path.dirname(testRunner);
	return writeFile(
		testRunner,
		`
		import path from 'path';
		import fs from 'fs';
		const componentBase = path.join('${testRunnerDirectory}', '../../');
		const sassFile = path.join('${testRunnerDirectory}', 'index.test.scss');
		import sassTrue from '${require.resolve("sass-true")}';
		import sass from '${require.resolve("sass")}';
		const getSassIncludePaths = ${files.getSassIncludePaths.toString()};
		const sassData = '$system-code: "origami-build-tools";' + fs.readFileSync(sassFile);
		sassTrue.runSass({
			data: sassData,
			// We use this to silence the sass console output when running "obt test".
			functions: {},
			includePaths: ['${testRunnerDirectory}'].concat(getSassIncludePaths(componentBase, ${JSON.stringify(config)}))
		}, {
			describe, it, sass
		});
	`
	)
		.then(async () => {
			await commandLine.run(
				"mocha",
				["test/scss/test-runner.js"],
				Object.assign({}, config, {
					localDir: path.join(__dirname, "../../"),
					stdout: false,
					stderr: false
				})
			);
		})
		.catch(e => {
			task.title += "\n    " + e.message;
			throw new Error("true test failed.");
		})
		.finally(() => unlink(testRunner));
};

module.exports = function(cfg) {
	const config = cfg || {};
	config.cwd = config.cwd || process.cwd();

	return {
		title: "running true test",
		task: (context, task) => trueTest(config, task),
		skip: function() {
			if (config.testFilter && config.testFilter !== 'sass') {
				return 'Sass tests filtered out with --test-filter';
			}
			return files.getSassTestFiles(config.cwd).then(sassTestFiles => {
				if (sassTestFiles.length === 0) {
					return `No sass test files found in ./test/scss`;
				}
			});
		}
	};
};

module.exports.watchable = true;
