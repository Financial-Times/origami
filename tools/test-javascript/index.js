#!/usr/bin/env node

import execa from 'execa'
import {globbySync as glob} from 'globby'
import { dirname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cwd } from 'node:process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const componentName = basename(cwd())
const javaScriptTestFiles = await glob('./test/**/*.test.js', {onlyFiles: true})

const webTestRunnerConfigurationPath = join(__dirname, 'web-test-runner.config.mjs')

if (javaScriptTestFiles.length) {
  try {
    await execa(`web-test-runner`, ['--group', componentName, '--config', webTestRunnerConfigurationPath],{
      stdio: 'inherit'
    })
  } catch {
    process.exitCode = 1;
  }
}
