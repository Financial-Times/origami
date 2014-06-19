/*global require, module*/

var DomDelegate = require('dom-delegate'),
    ToolTip = require('./ToolTip'),
    shareDom = require('./shareDom');

function TextCopyHelper(config) {
    "use strict";

    var bodyDomDelegate,
        inputDomDelegate,
        inputEl,
        inputWidth,
        tooltip;

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
    inputEl.focus();
    inputEl.select();
    tooltip = new ToolTip(config.message, config.parentEl);
    bodyDomDelegate = new DomDelegate(document.body);
    inputDomDelegate = new DomDelegate(inputEl);
    bodyDomDelegate.on('click', function handleBodyClick(ev) {
        if (!config.parentEl.contains(ev.target)) {
            close();
        }
    });
    inputDomDelegate.on('blur', close);
    inputDomDelegate.on('copy', function() {
        tooltip.setText('Copied!');
        if (typeof config.onCopy === "function") {
            config.onCopy();
        }
    });
    inputDomDelegate.on('keyup', function (ev) {
        if (ev.keyCode === 27) {
            inputEl.blur();
        }
    });
}

module.exports = TextCopyHelper;