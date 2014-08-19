'use strict';
var oOverlay = require('./src/js/overlay'),
    constructAll = function() {
        oOverlay.init();
        document.removeEventListener('o.DOMContentLoaded', constructAll);
    };

document.addEventListener('o.DOMContentLoaded', constructAll);
module.exports = oOverlay;
