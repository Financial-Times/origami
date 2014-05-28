/*global require,module*/

var oPCF = require('o-prioritised-content-filter');

function Header(rootEl) {
    "use strict";

    var primaryNavEl = rootEl.querySelector('.o-ft-header__primary nav ul'),
        secondaryNavEl = rootEl.querySelector('.o-ft-header__secondary nav ul'),
        toolsEl = rootEl.querySelector('.o-ft-header__tools'),
        primaryNavContentFilter,
        secondaryNavContentFilter,
        toolsContentFilter;

    if (primaryNavEl) {
        primaryNavContentFilter = new oPCF(primaryNavEl, { filterOnResize: false });
    }
    if (secondaryNavEl) {
        secondaryNavContentFilter = new oPCF(secondaryNavEl, { filterOnResize: false });
    }
    if (toolsEl) {
        toolsContentFilter = new oPCF(toolsEl, { filterOnResize: false });
    }

    function resizeHandler() {
        if (primaryNavContentFilter) {
            primaryNavContentFilter.filter();
        }
        if (secondaryNavContentFilter) {
            secondaryNavContentFilter.filter();
        }
        if (toolsContentFilter) {
            toolsContentFilter.filter();
        }
    }

    function destroy() {
        window.removeEventListener('resize', resizeHandler, false);
    }

    window.addEventListener('resize', resizeHandler, false);

    this.destroy = destroy;

}


module.exports = Header;

