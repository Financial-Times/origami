/*global require, module*/

var ShareLinks = require('./src/js/ShareLinks');

document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    ShareLinks.prototype.createAllIn(document.body);
});

module.exports = ShareLinks;