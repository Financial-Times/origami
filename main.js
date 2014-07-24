/*global require, module*/

var Tabs = require('./src/js/Tabs'),
    constructAll = function() {
        'use strict';
        Tabs.prototype.createAllIn(document.body);
        document.removeEventListener('o.DOMContentLoaded', constructAll);
    };

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = Tabs;
