o = window.o || {};

o.fireEvent = function (el, event) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, false, true);
    el.dispatchEvent(evt);
};