/*global require*/

var Nav = require('./../../src/js/Nav'),
    navEls = document.querySelectorAll('.o-ft-header__nav');

for (var c = 0, l = navEls.length; c < l; c++) {
    new Nav(navEls[c]);
}