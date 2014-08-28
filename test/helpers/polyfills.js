'use strict';
(function() {
    // Normalise/polyfill Element.matches
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector || function (selector) {
            var nodes = (this.parentNode || this.document).querySelectorAll(selector),
                i = -1;
            while (nodes[++i] && nodes[i] !== this){}
            return !!nodes[i];
        };
    }
})();