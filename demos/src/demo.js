/*global require*/
require('./../../main');

document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});