/*global require*/

var ShareLinks = require('./src/js/ShareLinks');

var shareEls = document.querySelectorAll('.o-share');

for (var c = 0, l = shareEls.length; c < l; c++) {
    new ShareLinks(shareEls[c]);
}