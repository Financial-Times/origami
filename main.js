'use strict';

require('o-hoverable');

var viewport = require('o-viewport');
var Delegate = require('dom-delegate');
var forceCondensedMode;
var initialised;
var el;

function init () {
    if (!initialised) {
        initialised = true;
        viewport.listenTo('scroll');
        var delegate = new Delegate(document.body);
        el = document.querySelector('.o-ft-header');
        if (!el) return;

        delegate.on('oViewport.scroll', function (ev) {
            condense(ev.detail.scrollTop);
        });

        condense(document.body.scrollTop);
    }
}

function condense (scrollTop) {
    if (scrollTop >= 30 || forceCondensedMode) {
        el.classList.add('o-ft-header--condensed');
    } else {
        el.classList.remove('o-ft-header--condensed');
    }
}

function forceCondense () {
    forceCondensedMode = true;
    condense(document.body.scrollTop);
}

function unforceCondense (expandNow) {
    forceCondensedMode = false;
    condense(expandNow ? 0 : document.body.scrollTop);
}

module.exports = {
    init: init,
    forceCondense: forceCondense,
    unforceCondense: unforceCondense
};