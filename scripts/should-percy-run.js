'use strict';

import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {shouldPercyRun} from "./lib/should-percy-run.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

shouldPercyRun(__dirname ,component) ? process.exit(): process.exit(8);

