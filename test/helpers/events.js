'use strict';
var o = window.o || {};

var nativeNonBubblers = ['error', 'blur', 'focus', 'scroll', 'resize'];

o.fireEvent = function (el, event, data) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, !(nativeNonBubblers.indexOf(event) > -1), true);
    data && Object.keys(data).forEach(function (key) {
        evt[key] = data[key];
    });
    el.dispatchEvent(evt);
};

o.fireCustomEvent = function (el, event, data) {
    el.dispatchEvent(new CustomEvent(event, {
        detail: data,
        bubbles: true
    }));
};