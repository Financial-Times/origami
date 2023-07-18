'use strict';

import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {shouldPercyRun} from "./lib/should-percy-run.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workspace = "./" + process.env.WORKSPACE

const run = shouldPercyRun(__dirname, workspace);
console.log(workspace, '\nResult:', run, '/n');
run ? process.exit(): process.exit(8);

