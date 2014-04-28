'use strict';

require('o-hoverable');

var viewport = require('o-viewport');
var Delegate = require('ftdomdelegate');
var forceCondensedMode;
var initialised;
var el;

function init () {
    if (!initialised) {
        initialised = true;
        viewport.listenTo('scroll');
        var delegate = new Delegate(document);
        el = document.querySelector('.o-ft-header');

        delegate.on('oViewport.scroll', null, function (ev) {
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