function triggerEvent(el, eventName, data) {
    "use strict";
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    if (data) {
        for (var prop in data) {
            if (data.hasOwnProperty(prop)) {
                event[prop] = data[prop];
            }
        }
    }
    el.dispatchEvent(event);
}

module.exports = triggerEvent;