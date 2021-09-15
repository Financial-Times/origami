'use strict';

const denodeify = require('util').promisify;

/**
 * A promisfied version of the `rm -rf` unix command.
*/
module.exports = denodeify(require('rimraf'));
