/*global exports*/

var sandboxEl;

function init() {
    "use strict";
    if (document.querySelector('.sandbox')) {
        sandboxEl = document.querySelector('.sandbox');
    } else {
        sandboxEl = document.createElement('div');
        sandboxEl.classList.add('sandbox');
        document.body.appendChild(sandboxEl);
    }
}

function reset() {
    "use strict";
    while (sandboxEl.firstChild) {
        sandboxEl.removeChild(sandboxEl.firstChild);
    }
}

function setContents(html) {
    "use strict";
    sandboxEl.innerHTML = html;
}

exports.init = init;
exports.reset = reset;
exports.setContents = setContents;