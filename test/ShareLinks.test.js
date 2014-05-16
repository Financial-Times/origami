/*global require,describe,beforeEach,afterEach,it,expect*/

var fixtures = require('./helpers/fixtures'),
    ShareLinks = require('./../main'),
    testShareLinks,
    shareLinksEl;

describe("general behaviour", function() {
    "use strict";

    beforeEach(function(){
        fixtures.insertShareLinks();
        shareLinksEl = document.querySelector('[data-o-component=o-share]');
        testShareLinks = new ShareLinks(shareLinksEl);
    });

    afterEach(function() {
        testShareLinks.destroy();
        fixtures.reset();
    });

    it("is defined", function() {
        expect(testShareLinks).toBeDefined();
    });

    it("initialisation", function() {
        expect(shareLinksEl.classList.contains('o-share--js')).toBe(true);
    });

});