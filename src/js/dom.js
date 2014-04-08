/*global module */

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

function getNativeMethod(methodList, obj) {
    "use strict";
    for (var c = 0, l = methodList.length; c < l; c++) {
        if (methodList[c] in obj) {
            return methodList[c];
        }
    }
}

var methodToUse = getNativeMethod(["matches", "matchesSelector", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector","oMatchesSelector"], Element.prototype);

function matchesSelector(el, selector) {
    "use strict";
    if (methodToUse) {
        if (el[methodToUse]) {
            return el[methodToUse](selector);
        } else {
            return false;
        }
    } else {
        var nodes = (el.parentNode || el.document).querySelectorAll(selector),
            i = -1;
        while (nodes[++i] && nodes[i] !== el){}
        return !!nodes[i];
    }
}

function getClosest(el, selector) {
    "use strict";
    while (el) {
        if (matchesSelector(el, selector)) {
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
    while (el = el.previousSibling) {
        if (el.nodeType === 1) {
            ++i;
        }
    }
    return i;
}

module.exports = {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    getClosest: getClosest,
    matchesSelector: matchesSelector,
    getElementIndex: getElementIndex
};