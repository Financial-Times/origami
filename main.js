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

var getOrientation = (function () {
    var orientationPropName = prefixer.dom(screen, 'orientation');

    if (orientationPropName) {
        return function () {
            return screen[orientationPropName].split('-')[0];
        };
    } else {
        return function () {
            return body.clientHeight >= body.clientWidth ? 'portrait' : 'landscape';
        };
    }
})();

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

function listenToResize () {

    if (init('resize')) return;
  
    delegate.on('resize', _.debounce(function (ev) {
        broadcast('resize', {
            clientHeight: body.clientHeight,
            clientWidth: body.clientWidth,
            originalEvent: ev
        });
    }, intervals.resize));
}

function listenToOrientation () {

    if (init('orientation')) return;

    delegate.on('orientationchange', _.debounce(function (ev) {
        broadcast('orientation', {
            clientHeight: body.clientHeight,
            clientWidth: body.clientWidth,
            orientation: getOrientation(),
            originalEvent: ev
        });
    }, intervals.orientation));
}

function listenToScroll () {

    if (init('scroll')) return;

    delegate.on('scroll', _.throttle(function (ev) {
        broadcast('scroll', {
            clientHeight: body.clientHeight,
            clientWidth: body.clientWidth,
            scrollHeight: body.scrollHeight,
            scrollLeft: body.scrollLeft,
            scrollTop: body.scrollTop,
            scrollWidth: body.scrollWidth,
            originalEvent: ev
        });
    }, intervals.scroll));
}

function listenTo (event) {
    if (event === 'resize') {
        listenToResize();
    } else if (event === 'scroll') {
        listenToScroll();
    } else if (event === 'orientation') {
        listenToOrientation();
    }
}

module.exports = {
    debug: function () {
        debug = true;
    },
    listenTo: listenTo,
    setInterval: setInterval,
    getOrientation: getOrientation
};