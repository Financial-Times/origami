/*global require*/
var oHeader = require('../../main.js'),
    headerEls = document.querySelectorAll('header');

for (var c = 0, l = headerEls.length; c < l; c++) {
    new oHeader(headerEls[c]);
}