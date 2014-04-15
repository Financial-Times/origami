(function() {
    // Normalise/polyfill Element.matches
    "use strict";
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector || function (selector) {
            "use strict";
            var nodes = (this.parentNode || this.document).querySelectorAll(selector),
                i = -1;
            while (nodes[++i] && nodes[i] !== this){}
            return !!nodes[i];
        };
    }
})();