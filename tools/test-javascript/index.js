#!/usr/bin/env node

import process from 'node:process'
import execa from 'execa'
import {globbySync as glob} from 'globby'
import { dirname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cwd } from 'node:process';

const debug = process.argv[2] === '--debug';
const __dirname = dirname(fileURLToPath(import.meta.url));
const componentName = basename(cwd())
const javaScriptTestFiles = await glob('./test/**/*.test.js', {onlyFiles: true})

const webTestRunnerConfigurationPath = join(__dirname, 'web-test-runner.config.mjs')

if (javaScriptTestFiles.length) {
  try {
    await execa(`web-test-runner`, [
        ...(debug ? ['--open', '--manual'] : []),
        '--group', componentName, '--config', webTestRunnerConfigurationPath
      ],
      {stdio: 'inherit'}
    )
  } catch {
    process.exitCode = 1;
  }
}
