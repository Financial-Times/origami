'use strict';

require('o-hoverable');

var viewport = require('o-viewport');
var Delegate = require('ftdomdelegate');
var forceCondensedMode;
var el;

function init () {
    viewport.listenTo('scroll');
    viewport.listenTo('resize');
    var delegate = new Delegate(document.body);
    el = document.querySelector('.o-ft-header');

    delegate.on('oViewport.scroll', null, function (ev) {
        condense(ev.detail.scrollTop);
    });

    condense(document.body.scrollTop);
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
    condense();
}

function unforceCondense () {
    forceCondensedMode = false;
    condense();
}

module.exports = {
    init: init,
    forceCondense: forceCondense,
    unforceCondense: unforceCondense
};