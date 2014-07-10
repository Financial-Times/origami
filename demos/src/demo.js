/*global require*/
require('../../main.js');

document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    console.log(CustomEvent);
    document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});