/*global require, module*/

var ToolTip = require('./ToolTip'),
    shareDom = require('./shareDom');

function TextCopyHelper(config) {
    "use strict";

    function close() {
        inputEl.removeEventListener('blur', close, false);
        config.parentEl.removeChild(inputEl);
        tooltip.destroy();
        tooltip = null;
        inputEl = null;
        if (typeof config.onClose === "function") {
            config.onClose();
        }
    }

    function handleCopy() {
        tooltip.setText('Copied!');
        if (typeof config.onCopy === "function") {
            config.onCopy();
        }
    }

    function handleKeyup(ev) {
        if (ev.keyCode === 27) {
            inputEl.blur();
        }
    }

    var inputEl = shareDom.createInputEl(config.text),
        inputWidth,
        tooltip;
    inputEl.addEventListener('blur', close, false);
    inputEl.addEventListener('copy', handleCopy, false);
    inputEl.addEventListener('keyup', handleKeyup, false);
    config.parentEl.insertBefore(inputEl, config.parentEl.childNodes[0]);
    inputWidth = shareDom.getPixelWidthOfText(config.text, inputEl);
    if (inputWidth !== -1) {
        inputEl.style.width = inputWidth + 'px';
    }
    inputEl.focus();
    inputEl.select();
    tooltip = new ToolTip(config.message, config.parentEl);
}

module.exports = TextCopyHelper;