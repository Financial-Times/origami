/*global exports */

function hasClass(el, c) {
    "use strict";
    return (' ' + el.className + ' ').indexOf(' ' + c + ' ') > -1;
}

function addClass(el, c) {
    "use strict";
    if (!hasClass(el, c)) {
        el.className = el.className + " " + c;
    }
}

function removeClass(el, c) {
    "use strict";
    if (hasClass(el, c)) {
        var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
        el.className = el.className.replace(reg,' ');
    }
}

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

exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.getClosest = getClosest;
exports.getElementIndex = getElementIndex;