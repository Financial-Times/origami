#!/usr/bin/env node

import sassTrue from 'sass-true'
import sass from 'sass'
import {globbySync as glob} from "globby"
const sassTestFiles = glob('./test/**/index.test.scss', {onlyFiles: true})

describe('sass', () => {
  for (const file of sassTestFiles) {
    sassTrue.runSass({
      file,
      functions: {},
      includePaths: ['../../node_modules']
    }, {
      describe,
      it,
      sassEngine: sass
    })
  }
})
