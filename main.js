/*global require,module*/

var oHeader = require('./src/js/Header');

document.addEventListener('o.DOMContentLoaded', function() {
    "use strict";
    oHeader.prototype.createAllIn(document.body);
});

module.exports = oHeader;
