'use strict';

const isCI = require('is-ci');
const ListrMultilineRenderer = require('listr-multiline-renderer');

module.exports = isCI ? 'verbose' : ListrMultilineRenderer;
