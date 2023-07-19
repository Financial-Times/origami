'use strict';

import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {shouldPercyRun} from "./lib/should-percy-run.js";
import core from "@actions/core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workspace = "./" + process.env.WORKSPACE
try {
	const run = await shouldPercyRun(__dirname, workspace);
	console.log(workspace, '\nResult:', run, '/n');
	run ? console.log('-RESULT:true') : console.log('-RESULT:false');
} catch (error) {
	console.log(error);
	core.setFailed(error.message)
}

