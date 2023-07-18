'use strict';

import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {shouldPercyRun} from "./lib/should-percy-run.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const workspace = "./" + process.env.WORKSPACE

shouldPercyRun(__dirname, workspace) ? process.exit(): process.exit(8);

