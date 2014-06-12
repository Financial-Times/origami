/*global require*/

(function() {
    "use strict";

    require('./../../main').wrap();

    var tableEls,
        checkboxEls;

    function checkboxChangeHandler(ev) {
        var cssClass = ev.target.getAttribute('data-switch-class'),
            c,
            l;
        for (c = 0, l = tableEls.length; c < l; c++) {
            if (ev.target.checked) {
                tableEls[c].classList.add(cssClass);
            } else {
                tableEls[c].classList.remove(cssClass);
            }
        }
    }

    tableEls = document.querySelectorAll('.o-table');
    checkboxEls = document.querySelectorAll('input[type=checkbox]');

    for (var c = 0, l = checkboxEls.length; c < l; c++) {
        checkboxEls[c].addEventListener('change', checkboxChangeHandler, false);
    }

})();