/*global require, module*/

var ShareLinks = require('./src/js/ShareLinks'),
    constructAll = function() {
        'use strict';
        ShareLinks.prototype.createAllIn(document.body);
        document.removeEventListener('o.DOMContentLoaded', constructAll);
    };

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = ShareLinks;