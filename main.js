var Delegate = require('ftdomdelegate');
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

function broadcast (name, data) {
    if (debug) {
        console.log('o-viewport', name, data);
    }
    body.dispatchEvent(new CustomEvent('oViewport.' + eventType, {
        detail: data,
        bubbles: true
    }));
}

function getOrientationListener () {
    
    // not using window.orientation because of http://www.matthewgifford.com/blog/2011/12/22/a-misconception-about-window-orientation/

    var orientationPropName = prefixer.dom(screen, 'orientation');

    if (orientationPropName) {
        return function (ev) {
            broadcast('orientation', {
                clientHeight: body.clientHeight,
                clientWidth: body.clientWidth,
                orientation: screen[orientationPropName].split('-')[0],
                originalEvent: ev
            });
        };
    } else {
        return function (ev) {
            broadcast('orientation', {
                clientHeight: body.clientHeight,
                clientWidth: body.clientWidth,
                orientation: body.clientHeight >= body.clientWidth ? 'portrait' : 'landscape',
                originalEvent: ev
            });
        };
    }
}

function setInterval (event, interval) {
    if (typeof arguments[0] === 'number') {
        setInterval ('scroll', arguments[0]);
        setInterval ('resize', arguments[1]);
        setInterval ('orientation', arguments[2]);
    } else if (interval) {
        intervals[event] = interval;
    }
}

function init(event) {
    if (initFlags[event]) return true;

    initFlags[event] = true;

    delegate = delegate || new Delegate(window);
    
    body = body || document.body;
}

function resize () {

    if (init('resize')) return;
  
    delegate.on('resize', _.debounce(intervals.resize, function (ev) {
        broadcast('resize', {
            clientHeight: body.clientHeight,
            clientWidth: body.clientWidth,
            originalEvent: ev
        });
    }));
}

function orientation () {

    if (init('orientation')) return;

    delegate.on('orientationchange', _.debounce(intervals.orientation, getOrientationListener()));
}

function scroll () {

    if (init('scroll')) return;

    delegate.on('scroll', _.throttle(intervals.scroll, function (ev) {
        broadcast('scroll', {
            clientHeight: body.clientHeight,
            clientWidth: body.clientWidth,
            scrollHeight: body.scrollHeight,
            scrollLeft: body.scrollLeft,
            scrollTop: body.scrollTop,
            scrollWidth: body.scrollWidth,
            originalEvent: ev
        });
    }));
}

module.exports = {
    debug: function () {
        debug = true;
    },
    resize: resize,
    orientation: orientation,
    scroll: scroll,
    setInterval: setInterval
};