#!/usr/bin/env node

import {$} from "zx"

import {globbySync as glob} from "globby"
const sassTestFiles = glob('./test/**/index.test.scss', {onlyFiles: true})
if (sassTestFiles.length) {
  try {
    await $`mocha ../../tools/test-sass/sass-test-suite.js`
  } catch {
    process.exitCode = 1;
  }
}
