'use strict';

var months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',');
var days = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',');
var timer;
var updaters = [];


var formats = {
    long: 'MMMM d, yyyy h:mm a',
    short: 'd/M/yy'
};

/*
    See http://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html for formatting conventions used
*/
var formatReplacementsMap = {
    MMMM: function () {
        return months[this.getMonth()];
    },
    MMM: function () {
        return months[this.getMonth()].substr(0,3);
    },
    MM: function () {
        return pad2(this.getMonth() + 1, 2);
    },
    M: function () {
        return this.getMonth() + 1;
    },
    yyyy: Date.prototype.getFullYear,
    yy: function () {
        return this.getFullYear().substr(0, 2);
    },
    EEEE: function () {
        return days[this.getDay()];
    },
    EEE: function () {
        return days[this.getDay()].substr(0,3);
    },
    d: Date.prototype.getDate,
    dd: function () {
        return pad2(this.getDate() + 1, 2);
    },
    m: Date.prototype.getMinutes,
    mm: function () {
        return pad2(this.getMinutes(), 2);
    },
    h: function () {
        return (this.getHours() % 12) - 1;
    },
    hh: function () {
        return pad2((this.getHours() % 12) - 1, 2);
    },
    a: function () {
        return this.getHours() >= 12 ? 'pm' : 'am';
    }
};

function pad2 (number) {
    return ('0' + number).slice(-2);
}

function compileTemplate (tpl) {

}

function toDate (date) {
    return date instanceof Date ? date : new Date(date);
}

function format (date, tpl) {
    tpl = formats[tpl] || tpl;
    date = toDate(date);
    return tpl.replace(/[a-z]+/ig, function (match) {
        var replacer = formatReplacementsMap[match];
        return replacer ? replacer.apply(date) : match;
    });
}

function timeAgo (date, fallback) {
    date = toDate(date);
    var interval = (new Date()) - date();
    if (interval < 30 * 1000) {
        // just now
    } else if (interval < 90 * 1000) {
        // minute
    } else if (interval < 55 * 60 * 1000) {
        // minutes
    } else {
        return fallback ? format(date, fallback) : '';
    }
}


function watch (container, date) {
    container = container || document.body;
    if (container.classList.contains('o-date-updater')) {
        date = date || container.getAttribute('datetime');
        createUpdater(container, date);
    } else {
        Array.prototype.forEach.apply(container.querySelectorAll('.o-date-updater'), function (el) {
            createUpdater(el, el.getAttribute('datetime'));
        });
    }
}

function pause (container, destroy) {
    // container = container || document.body;
    // if (container.classList.contains('o-date-updater')) {
    //     date = date || container.getAttribute('datetime') || container.dataset.date;
    //     createUpdater(container, date);
    // } else {
    //     Array.prototype.forEach.apply(container.querySelectorAll('.o-date-updater'), function (el) {
    //         createUpdater(el, el.getAttribute('datetime') || el.dataset.date);
    //     });
    // }
}

function unwatch (container, destroy) {
    // container = container || document.body;
    // if (container.classList.contains('o-date-updater')) {
    //     date = date || container.getAttribute('datetime') || container.dataset.date;
    //     createUpdater(container, date);
    // } else {
    //     Array.prototype.forEach.apply(container.querySelectorAll('.o-date-updater'), function (el) {
    //         createUpdater(el, el.getAttribute('datetime') || el.dataset.date);
    //     });
    // }
}

function refresh () {
    updaters.forEach(function (u) {
        u.update();
    });
    return setTimeout(refresh, 60000);
}

function createUpdater (el, date) {
    timer = timer || refresh();
    updaters.push(new Updater(el, date));
}

function Updater (el, date) {
    this.date = toDate(date);
    this.el = el;
    this.init();
}

Updater.prototype = {
    init: function () {
        this.fallback = this.el.dataset.oDateUpdateFallback || 'long';
    },
    update: function () {
        if (!this.paused) {
            this.printer.innerHTML = this.timeAgo();
        }
    },
    timeAgo: function () {
        return timeAgo(this.date, this.fallback);
    }
};

module.exports = {
    format: format,
    watch: watch,
    unwatch: unwatch,
    pause: pause,
    timeAgo: timeAgo
};
