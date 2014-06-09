/*global exports*/

function nodeListToArray(nl) {
    "use strict";
    return [].map.call(nl, function(element) {
        return element;
    });
}

function dispatchCustomEvent(el, name, data) {
    "use strict";
    if (document.createEvent && el.dispatchEvent) {
        var event = document.createEvent('Event');
        event.initEvent(name, true, true);
        if (data) {
            event.detail = data;
        }
        el.dispatchEvent(event);
    }
}

exports.nodeListToArray = nodeListToArray;
exports.dispatchCustomEvent = dispatchCustomEvent;