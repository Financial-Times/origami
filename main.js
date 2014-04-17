'use strict';

var months = 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',');
var days = 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',');

var formats = {
    long: 'MMMMM d, yyyy h:mm a',
    short: 'd/M/y'
};

var formatReplacementsMap = {
    MMMMM: function () {
        return months[this.getMonth()];
    },
    yyyy: Date.prototype.getFullYear,
    d: Date.prototype.getDate,
    dddd: function () {
        return days[this.getDay()];
    },
    m: Date.prototype.getMinutes,
    mm: function () {
        return pad(this.getMinutes(), 2);
    },
    h: function () {
        return (this.getHours() % 12) - 1;
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
