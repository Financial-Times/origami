'use strict';

var months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',');
var days = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',');

var formats = {
    long: 'MMMM d, yyyy h:mm a',
    short: 'd/M/y'
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
        return pad(this.getMonth() + 1, 2);
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
        return pad(this.getDate() + 1, 2);
    },
    m: Date.prototype.getMinutes,
    mm: function () {
        return pad(this.getMinutes(), 2);
    },
    h: function () {
        return (this.getHours() % 12) - 1;
    },
    hh: function () {
        return pad((this.getHours() % 12) - 1, 2);
    },
    a: function () {
        return this.getHours() >= 12 ? 'pm' : 'am';
    }
};

function pad(number, chars) {
    number = ''+number;
    while(number.length < chars) {
        number = '0' + number;
    }
    return number;
}

function format (date, tpl) {
    tpl = formats[tpl] || tpl;
    date = date instanceof Date ? date : new Date(date);
    return tpl.replace(/[a-z]+/ig, function (match) {
        var replacer = formatReplacementsMap[match];
        return replacer ? replacer.apply(date) : match;
    });
}

module.exports = {
    format: format
};
