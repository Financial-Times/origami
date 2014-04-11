/*global require, module*/

var Tabs = require('./src/js/Tabs');

document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    Tabs.prototype.createAllIn(document.body);
});

module.exports = Tabs;
