/*global exports*/
"use strict";
var sandboxEl;

function init() {
    if (document.querySelector('.sandbox')) {
        sandboxEl = document.querySelector('.sandbox');
    } else {
        sandboxEl = document.createElement('div');
        sandboxEl.classList.add('sandbox');
        document.body.appendChild(sandboxEl);
    }
}

function reset() {
    while (sandboxEl.firstChild) {
        sandboxEl.removeChild(sandboxEl.firstChild);
    }
}

function setContents(html) {
    sandboxEl.innerHTML = html;
}

exports.init = init;
exports.reset = reset;
exports.setContents = setContents;