/*global require, module*/
"use strict";

var DomDelegate = require('ftdomdelegate');
var ToolTip = require('./ToolTip');
var shareDom = require('./shareDom');

function TextCopyHelper(config) {
	var bodyDomDelegate;
	var inputDomDelegate;
	var inputEl;
	var inputWidth;
	var tooltip;

	function close() {
		bodyDomDelegate.destroy();
		inputDomDelegate.destroy();
		config.parentEl.removeChild(inputEl);
		tooltip.destroy();
		tooltip = null;
		inputEl = null;

		if (typeof config.onClose === "function") {
			config.onClose();
		}
	}

	inputEl = shareDom.createInputEl(config.text);
	config.parentEl.insertBefore(inputEl, config.parentEl.childNodes[0]);
	inputWidth = shareDom.getPixelWidthOfText(config.text, inputEl);

	if (inputWidth !== -1) {
		inputEl.style.width = inputWidth + 'px';
	}

	inputEl.select();
	tooltip = new ToolTip(config.message, config.parentEl);
	bodyDomDelegate = new DomDelegate(document.body);
	inputDomDelegate = new DomDelegate(inputEl);
	bodyDomDelegate.on('click', function(ev) {
		if (!config.parentEl.contains(ev.target)) {
			close();
		}
	});
	bodyDomDelegate.on('keyup', function (ev) {
		if (ev.keyCode === 27 || ev.keyCode === 9) {
			close();
		}
	});

	// Stop input from being edited
	inputDomDelegate.on('keypress', function(ev) {
		ev.preventDefault();
	});

	inputDomDelegate.on('copy', function() {
		tooltip.setText('Copied!');

		if (typeof config.onCopy === "function") {
			config.onCopy();
		}
	});
}

module.exports = TextCopyHelper;
