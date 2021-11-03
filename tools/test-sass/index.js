#!/usr/bin/env node

import {$} from 'zx'
import {globbySync as glob} from 'globby'
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sassTestFiles = glob('./test/**/index.test.scss', {onlyFiles: true})

if (sassTestFiles.length) {
  try {
    await $`mocha ${__dirname}/sass-test-suite.js`
  } catch {
    process.exitCode = 1;
  }
}
