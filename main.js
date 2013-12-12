"use strict";
var Dialog = require('./js/dialog'),
    plugin = require('./js/jquery.dialog-trigger');

require('./js/dialog-types/overlay');
require('./js/dialog-types/dropdown');

$('.o-dialog--trigger').oDialogTrigger();

module.exports = Dialog;

 