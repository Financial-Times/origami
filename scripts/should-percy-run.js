'use strict';

import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import {shouldPercyRun} from "./lib/should-percy-run.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const components = JSON.parse(process.argv[2]);

components.forEach(component => {
	const run = shouldPercyRun(__dirname ,component);
	console.log(run);
});
