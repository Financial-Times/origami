/*global require, exports*/
"use strict";

var oDom = require('o-dom');

function wrapElement(targetEl, wrapEl) {
    var parentEl = targetEl.parentNode;
    parentEl.insertBefore(wrapEl, targetEl);
    wrapEl.appendChild(targetEl);
}

function wrap(tableSelector, wrapClass) {
    tableSelector = typeof tableSelector === "string" ? tableSelector : ".o-table";
    wrapClass = typeof wrapClass === "string" ? wrapClass : "o-table-wrapper";
    var matchingEls = document.querySelectorAll(tableSelector),
        wrapEl;
    if (matchingEls.length > 0) {
        wrapEl = document.createElement('div');
        wrapEl.setAttribute("class", wrapClass);
        for (var c = 0, l = matchingEls.length; c < l; c++) {
            var tableEl = matchingEls[c];
            if (!oDom.matches(tableEl.parentNode, "." + wrapClass)) {
                wrapElement(tableEl, wrapEl.cloneNode(false));
            }
        }
    }
}

exports.wrap = wrap;