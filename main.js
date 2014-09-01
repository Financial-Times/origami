/*global require, module*/
'use strict';

var ShareLinks = require('./src/js/ShareLinks'),
    constructAll = function() {
        ShareLinks.init();
        document.removeEventListener('o.DOMContentLoaded', constructAll);
    };

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = ShareLinks;