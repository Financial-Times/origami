'use strict';
var oOverlay = require('./src/js/overlay'),
    constructAll = function() {
        'use strict';
        oOverlay.init(document.body);
        document.removeEventListener('o.DOMContentLoaded', constructAll);
    };

document.addEventListener('o.DOMContentLoaded', constructAll);
module.exports = oOverlay;
