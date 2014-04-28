'use strict';

var Delegate = require('dom-delegate');
var _ = require('lodash');
var prefixer = require('o-useragent').prefixer;
var body;
var debug;
var delegate;
var initFlags = {};
var intervals = {
    resize: 100,
    orientation: 100,
    scroll: 100
};

function broadcast (eventType, data) {
    if (debug) {
        console.log('o-viewport', eventType, data);
    }
    body.dispatchEvent(new CustomEvent('oViewport.' + eventType, {
        detail: data,
        bubbles: true
    }));
}

var getOrientation = (function () {
    var orientation = prefixer.dom(screen, 'orientation');
    var matchMedia = prefixer.dom(window, 'matchMedia');
    
    if (orientation) {
        return function () {
            return screen[orientation].split('-')[0];
        };
    } else if (matchMedia) {
        return function () {
            return window[matchMedia]('(orientation: portrait)') ? 'portrait' : 'landscape';
        };
    } else {
        return function () {
            return window.innerHeight >= window.innerWidth ? 'portrait' : 'landscape';
        };
    }
})();

var getSize = function () {
    return {
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    };
};

function setThrottleInterval (eventType, interval) {
    if (typeof arguments[0] === 'number') {
        setThrottleInterval('scroll', arguments[0]);
        setThrottleInterval('resize', arguments[1]);
        setThrottleInterval('orientation', arguments[2]);
    } else if (interval) {
        intervals[eventType] = interval;
    }
}

function init(eventType) {
    if (initFlags[eventType]) return true;

    initFlags[eventType] = true;
    
    delegate = delegate || new Delegate(window);
        
    body = body || document.body;
}

function listenToResize () {

    if (init('resize')) return;
  
    delegate.on('resize', _.debounce(function (ev) {
        broadcast('resize', {
            size: getSize(),
            originalEvent: ev
        });
    }, intervals.resize));
}

function listenToOrientation () {

    if (init('orientation')) return;

    delegate.on('orientationchange', _.debounce(function (ev) {
        var dim = getSize();
        broadcast('orientation', {
            size: getSize(),
            orientation: getOrientation(),
            originalEvent: ev
        });
    }, intervals.orientation));
}

function listenToScroll () {

    if (init('scroll')) return;

    delegate.on('scroll', _.throttle(function (ev) {
        var dim = getSize();
        broadcast('scroll', {
            size: getSize(),
            scrollHeight: body.scrollHeight,
            scrollLeft: body.scrollLeft,
            scrollTop: body.scrollTop,
            scrollWidth: body.scrollWidth,
            originalEvent: ev
        });
    }, intervals.scroll));
}

function listenTo (eventType) {
    if (eventType === 'resize') {
        listenToResize();
    } else if (eventType === 'scroll') {
        listenToScroll();
    } else if (eventType === 'orientation') {
        listenToOrientation();
    }
}

module.exports = {
    debug: function () {
        debug = true;
    },
    listenTo: listenTo,
    setThrottleInterval: setThrottleInterval,
    getOrientation: getOrientation,
    getSize: getSize
};