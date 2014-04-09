/*global exports */

function listen(el, name, handler) {
    "use strict";
    if (el.addEventListener) {
        el.addEventListener(name, handler, false);
    } else if (el.attachEvent) {
        el.attachEvent("on" + name, handler);
    }
}

function unlisten(el, name, handler) {
    "use strict";
    if (el.removeEventListener) {
        el.removeEventListener(name, handler, false);
    } else if (el.detachEvent) {
        el.detachEvent("on" + name, handler);
    }
}

function trigger(el, name, data) {
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

exports.listen = listen;
exports.unlisten = unlisten;
exports.trigger = trigger;