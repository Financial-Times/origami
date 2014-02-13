"use strict";
var $ = require('jquery'),
	Dialog = require('./src/js/dialog');

Dialog.addPreset('modal', require('./src/js/presets/modal'));
Dialog.addPreset('dropdown', require('./src/js/presets/dropdown'));
Dialog.addPreset('dropup', require('./src/js/presets/dropup'));

Dialog.listen();

module.exports = Dialog;
