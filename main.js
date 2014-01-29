"use strict";
var Dialog = require('./js/dialog');

require('./js/dialog-types/overlay');
require('./js/dialog-types/dropdown');

$('.o-dialog--trigger').oDialogTrigger();

module.exports = Dialog;
