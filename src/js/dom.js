/*global exports */

function getClosest(el, selector) {
    "use strict";
    while (el) {
        if (el.matches(selector)) {
            return el;
        } else {
            el = el.parentElement;
        }
    }
    return false;
}

function getElementIndex(el) {
    "use strict";
    var i = 0;
    while (el.previousSibling) {
        el = el.previousSibling;
        if (el.nodeType === 1) {
            ++i;
        }
    }
    return i;
}

exports.getClosest = getClosest;
exports.getElementIndex = getElementIndex;