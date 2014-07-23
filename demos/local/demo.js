(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var times = document.querySelectorAll('[data-o-component="o-date"]');

var now = new Date();
var today  = new Date();
today.setHours(now.getHours() - 6);
var lastMonth = new Date();
lastMonth.setMonth(now.getMonth() - 6);

times[0].setAttribute('datetime', today.toISOString());
times[1].setAttribute('datetime', lastMonth.toISOString());

document.addEventListener("DOMContentLoaded", function() {
    "use strict";
    require('../../main.js').createAllIn(document.body);
});
},{"../../main.js":2}],2:[function(require,module,exports){
/*global require, module*/
'use strict';

var months = '["' + 'January,February,March,April,May,June,July,August,September,October,November,December'.split(',').join('","') + '"]';
var days = '["' + 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',').join('","') + '"]';
var formats = {
    datetime: 'MMMM d, yyyy h:mm a',
    date: 'MMMM d, yyyy'
};

var compiledTemplates = {};
var timer;

/*
    See http://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html for formatting conventions used
*/
var formatReplacementsMap = {
    MMMM: 'months[date.getMonth()]',
    MMM: 'months[date.getMonth()].substr(0,3)',
    MM: 'pad2(date.getMonth() + 1, 2)',
    M: '(date.getMonth() + 1)',
    yyyy: 'date.getFullYear()',
    yy: '(""+date.getFullYear()).substr(-2, 2)',
    EEEE: 'days[date.getDay()]',
    EEE: 'days[date.getDay()].substr(0,3)',
    d: 'date.getDate()',
    dd: 'pad2(date.getDate(), 2)',
    m: 'date.getMinutes()',
    mm: 'pad2(date.getMinutes(), 2)',
    h: '((date.getHours() % 12))',
    hh: 'pad2((date.getHours() % 12), 2)',
    a: '(date.getHours() >= 12 ? "pm" : "am")'
};

function compile (format) {
    var tpl = formats[format] || format;
    
    var funcString = 'var months= ' + months + ', days= ' + days + ';';
    funcString +='function pad2 (number) {return ("0" + number).slice(-2)}';
    funcString += 'return "' + tpl.replace(/\\?[a-z]+/ig, function (match) {
        if (match.charAt(0) === '\\') {
            return match.substr(1);
        }
        var replacer = formatReplacementsMap[match];

        return replacer ? '" + ' + replacer + ' + "' : match;
    }) + '"';

    return Function('date', funcString);
}

function toDate (date) {
    return date instanceof Date ? date : new Date(date);
}

function format (date, format) {
    format = format || 'datetime';
    var tpl = compiledTemplates[format] || compile(format);
    return tpl(toDate(date));
}

function update (noExec) {
    noExec || Array.prototype.forEach.call(document.querySelectorAll('[data-o-component="o-date"]'), function (el) {
        ftTime(el);
    });
    timer = setTimeout(update, 60000);
}

function autoUpdate () {
    timer || update(true);
}


function ftTime(el) {
    var date = toDate(el.getAttribute('datetime'));
    var printer = el.querySelector('.o-date__printer') || el;
    var interval = Math.round(((new Date()) - date) / 1000);
    printer.innerHTML = interval < (365 * 60 * 60 * 24) ? timeAgo(toDate(date), interval) : format(date, 'date');
    el.title = format(date, 'datetime');
}

function timeAgo (date, interval) {
    date = toDate(date);
    interval = interval || Math.round(((new Date()) - date) / 1000);
    if (interval < 45) {
        return interval + ' seconds ago';
    } else if (interval < 90) {
        return 'a minute ago';
    } else if (interval < 45 * 60) {
        return Math.round(interval / 60) + ' minutes ago';
    } else if (interval < 90 * 60) {
        return 'an hour ago';
    } else if (interval < 22 * 60 * 60) {
        return  Math.round(interval / (60 * 60)) + ' hours ago';
    } else if (interval < 36 * 60 * 60) {
        return 'a day ago';
    } else if (interval < 25 * 60 * 60 * 24) {
        return Math.round(interval / (60 * 60 * 24)) + ' days ago';
    } else if (interval < 45 * 60 * 60 * 24) {
        return 'a month ago';
    } else if (interval < 345 * 60 * 60 * 24) {
        return Math.round(interval / (60 * 60 * 24 * 30)) + ' months ago';
    } else if (interval < 547 * 60 * 60 * 24) {
        return 'a year ago';
    } else {
        return Math.max(2, Math.round(interval / (60 * 60 * 24 * 365))) + ' years ago';
    }
}

function init (el) {
    ftTime(el);
}

var createAllIn = function(el) {
    if (!el) {
        el = document.body;
    }
    var dateEls = el.querySelectorAll('[data-o-component="o-date"]');
    for (var i = 0; i < dateEls.length; i++) {
        init(dateEls[i]);
    }
    autoUpdate();
};

module.exports = {
    format: format,
    timeAgo: timeAgo,
    init: init,
    createAllIn: createAllIn
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9vcmlnYW1pLWJ1aWxkLXRvb2xzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvYWxiZXJ0by5lbGlhcy9vcmlnYW1pL28tZGF0ZS9kZW1vcy9zcmMvZGVtby5qcyIsIi9Vc2Vycy9hbGJlcnRvLmVsaWFzL29yaWdhbWkvby1kYXRlL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHRpbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1jb21wb25lbnQ9XCJvLWRhdGVcIl0nKTtcblxudmFyIG5vdyA9IG5ldyBEYXRlKCk7XG52YXIgdG9kYXkgID0gbmV3IERhdGUoKTtcbnRvZGF5LnNldEhvdXJzKG5vdy5nZXRIb3VycygpIC0gNik7XG52YXIgbGFzdE1vbnRoID0gbmV3IERhdGUoKTtcbmxhc3RNb250aC5zZXRNb250aChub3cuZ2V0TW9udGgoKSAtIDYpO1xuXG50aW1lc1swXS5zZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJywgdG9kYXkudG9JU09TdHJpbmcoKSk7XG50aW1lc1sxXS5zZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJywgbGFzdE1vbnRoLnRvSVNPU3RyaW5nKCkpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICByZXF1aXJlKCcuLi8uLi9tYWluLmpzJykuY3JlYXRlQWxsSW4oZG9jdW1lbnQuYm9keSk7XG59KTsiLCIvKmdsb2JhbCByZXF1aXJlLCBtb2R1bGUqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbW9udGhzID0gJ1tcIicgKyAnSmFudWFyeSxGZWJydWFyeSxNYXJjaCxBcHJpbCxNYXksSnVuZSxKdWx5LEF1Z3VzdCxTZXB0ZW1iZXIsT2N0b2JlcixOb3ZlbWJlcixEZWNlbWJlcicuc3BsaXQoJywnKS5qb2luKCdcIixcIicpICsgJ1wiXSc7XG52YXIgZGF5cyA9ICdbXCInICsgJ1N1bmRheSxNb25kYXksVHVlc2RheSxXZWRuZXNkYXksVGh1cnNkYXksRnJpZGF5LFNhdHVyZGF5Jy5zcGxpdCgnLCcpLmpvaW4oJ1wiLFwiJykgKyAnXCJdJztcbnZhciBmb3JtYXRzID0ge1xuICAgIGRhdGV0aW1lOiAnTU1NTSBkLCB5eXl5IGg6bW0gYScsXG4gICAgZGF0ZTogJ01NTU0gZCwgeXl5eSdcbn07XG5cbnZhciBjb21waWxlZFRlbXBsYXRlcyA9IHt9O1xudmFyIHRpbWVyO1xuXG4vKlxuICAgIFNlZSBodHRwOi8vZG9jcy5vcmFjbGUuY29tL2phdmFzZS83L2RvY3MvYXBpL2phdmEvdGV4dC9TaW1wbGVEYXRlRm9ybWF0Lmh0bWwgZm9yIGZvcm1hdHRpbmcgY29udmVudGlvbnMgdXNlZFxuKi9cbnZhciBmb3JtYXRSZXBsYWNlbWVudHNNYXAgPSB7XG4gICAgTU1NTTogJ21vbnRoc1tkYXRlLmdldE1vbnRoKCldJyxcbiAgICBNTU06ICdtb250aHNbZGF0ZS5nZXRNb250aCgpXS5zdWJzdHIoMCwzKScsXG4gICAgTU06ICdwYWQyKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpJyxcbiAgICBNOiAnKGRhdGUuZ2V0TW9udGgoKSArIDEpJyxcbiAgICB5eXl5OiAnZGF0ZS5nZXRGdWxsWWVhcigpJyxcbiAgICB5eTogJyhcIlwiK2RhdGUuZ2V0RnVsbFllYXIoKSkuc3Vic3RyKC0yLCAyKScsXG4gICAgRUVFRTogJ2RheXNbZGF0ZS5nZXREYXkoKV0nLFxuICAgIEVFRTogJ2RheXNbZGF0ZS5nZXREYXkoKV0uc3Vic3RyKDAsMyknLFxuICAgIGQ6ICdkYXRlLmdldERhdGUoKScsXG4gICAgZGQ6ICdwYWQyKGRhdGUuZ2V0RGF0ZSgpLCAyKScsXG4gICAgbTogJ2RhdGUuZ2V0TWludXRlcygpJyxcbiAgICBtbTogJ3BhZDIoZGF0ZS5nZXRNaW51dGVzKCksIDIpJyxcbiAgICBoOiAnKChkYXRlLmdldEhvdXJzKCkgJSAxMikpJyxcbiAgICBoaDogJ3BhZDIoKGRhdGUuZ2V0SG91cnMoKSAlIDEyKSwgMiknLFxuICAgIGE6ICcoZGF0ZS5nZXRIb3VycygpID49IDEyID8gXCJwbVwiIDogXCJhbVwiKSdcbn07XG5cbmZ1bmN0aW9uIGNvbXBpbGUgKGZvcm1hdCkge1xuICAgIHZhciB0cGwgPSBmb3JtYXRzW2Zvcm1hdF0gfHwgZm9ybWF0O1xuICAgIFxuICAgIHZhciBmdW5jU3RyaW5nID0gJ3ZhciBtb250aHM9ICcgKyBtb250aHMgKyAnLCBkYXlzPSAnICsgZGF5cyArICc7JztcbiAgICBmdW5jU3RyaW5nICs9J2Z1bmN0aW9uIHBhZDIgKG51bWJlcikge3JldHVybiAoXCIwXCIgKyBudW1iZXIpLnNsaWNlKC0yKX0nO1xuICAgIGZ1bmNTdHJpbmcgKz0gJ3JldHVybiBcIicgKyB0cGwucmVwbGFjZSgvXFxcXD9bYS16XSsvaWcsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICBpZiAobWF0Y2guY2hhckF0KDApID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaC5zdWJzdHIoMSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcGxhY2VyID0gZm9ybWF0UmVwbGFjZW1lbnRzTWFwW21hdGNoXTtcblxuICAgICAgICByZXR1cm4gcmVwbGFjZXIgPyAnXCIgKyAnICsgcmVwbGFjZXIgKyAnICsgXCInIDogbWF0Y2g7XG4gICAgfSkgKyAnXCInO1xuXG4gICAgcmV0dXJuIEZ1bmN0aW9uKCdkYXRlJywgZnVuY1N0cmluZyk7XG59XG5cbmZ1bmN0aW9uIHRvRGF0ZSAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlIGluc3RhbmNlb2YgRGF0ZSA/IGRhdGUgOiBuZXcgRGF0ZShkYXRlKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0IChkYXRlLCBmb3JtYXQpIHtcbiAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJ2RhdGV0aW1lJztcbiAgICB2YXIgdHBsID0gY29tcGlsZWRUZW1wbGF0ZXNbZm9ybWF0XSB8fCBjb21waWxlKGZvcm1hdCk7XG4gICAgcmV0dXJuIHRwbCh0b0RhdGUoZGF0ZSkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUgKG5vRXhlYykge1xuICAgIG5vRXhlYyB8fCBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1kYXRlXCJdJyksIGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBmdFRpbWUoZWwpO1xuICAgIH0pO1xuICAgIHRpbWVyID0gc2V0VGltZW91dCh1cGRhdGUsIDYwMDAwKTtcbn1cblxuZnVuY3Rpb24gYXV0b1VwZGF0ZSAoKSB7XG4gICAgdGltZXIgfHwgdXBkYXRlKHRydWUpO1xufVxuXG5cbmZ1bmN0aW9uIGZ0VGltZShlbCkge1xuICAgIHZhciBkYXRlID0gdG9EYXRlKGVsLmdldEF0dHJpYnV0ZSgnZGF0ZXRpbWUnKSk7XG4gICAgdmFyIHByaW50ZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuby1kYXRlX19wcmludGVyJykgfHwgZWw7XG4gICAgdmFyIGludGVydmFsID0gTWF0aC5yb3VuZCgoKG5ldyBEYXRlKCkpIC0gZGF0ZSkgLyAxMDAwKTtcbiAgICBwcmludGVyLmlubmVySFRNTCA9IGludGVydmFsIDwgKDM2NSAqIDYwICogNjAgKiAyNCkgPyB0aW1lQWdvKHRvRGF0ZShkYXRlKSwgaW50ZXJ2YWwpIDogZm9ybWF0KGRhdGUsICdkYXRlJyk7XG4gICAgZWwudGl0bGUgPSBmb3JtYXQoZGF0ZSwgJ2RhdGV0aW1lJyk7XG59XG5cbmZ1bmN0aW9uIHRpbWVBZ28gKGRhdGUsIGludGVydmFsKSB7XG4gICAgZGF0ZSA9IHRvRGF0ZShkYXRlKTtcbiAgICBpbnRlcnZhbCA9IGludGVydmFsIHx8IE1hdGgucm91bmQoKChuZXcgRGF0ZSgpKSAtIGRhdGUpIC8gMTAwMCk7XG4gICAgaWYgKGludGVydmFsIDwgNDUpIHtcbiAgICAgICAgcmV0dXJuIGludGVydmFsICsgJyBzZWNvbmRzIGFnbyc7XG4gICAgfSBlbHNlIGlmIChpbnRlcnZhbCA8IDkwKSB7XG4gICAgICAgIHJldHVybiAnYSBtaW51dGUgYWdvJztcbiAgICB9IGVsc2UgaWYgKGludGVydmFsIDwgNDUgKiA2MCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChpbnRlcnZhbCAvIDYwKSArICcgbWludXRlcyBhZ28nO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCA5MCAqIDYwKSB7XG4gICAgICAgIHJldHVybiAnYW4gaG91ciBhZ28nO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAyMiAqIDYwICogNjApIHtcbiAgICAgICAgcmV0dXJuICBNYXRoLnJvdW5kKGludGVydmFsIC8gKDYwICogNjApKSArICcgaG91cnMgYWdvJztcbiAgICB9IGVsc2UgaWYgKGludGVydmFsIDwgMzYgKiA2MCAqIDYwKSB7XG4gICAgICAgIHJldHVybiAnYSBkYXkgYWdvJztcbiAgICB9IGVsc2UgaWYgKGludGVydmFsIDwgMjUgKiA2MCAqIDYwICogMjQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoaW50ZXJ2YWwgLyAoNjAgKiA2MCAqIDI0KSkgKyAnIGRheXMgYWdvJztcbiAgICB9IGVsc2UgaWYgKGludGVydmFsIDwgNDUgKiA2MCAqIDYwICogMjQpIHtcbiAgICAgICAgcmV0dXJuICdhIG1vbnRoIGFnbyc7XG4gICAgfSBlbHNlIGlmIChpbnRlcnZhbCA8IDM0NSAqIDYwICogNjAgKiAyNCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChpbnRlcnZhbCAvICg2MCAqIDYwICogMjQgKiAzMCkpICsgJyBtb250aHMgYWdvJztcbiAgICB9IGVsc2UgaWYgKGludGVydmFsIDwgNTQ3ICogNjAgKiA2MCAqIDI0KSB7XG4gICAgICAgIHJldHVybiAnYSB5ZWFyIGFnbyc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDIsIE1hdGgucm91bmQoaW50ZXJ2YWwgLyAoNjAgKiA2MCAqIDI0ICogMzY1KSkpICsgJyB5ZWFycyBhZ28nO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdCAoZWwpIHtcbiAgICBmdFRpbWUoZWwpO1xufVxuXG52YXIgY3JlYXRlQWxsSW4gPSBmdW5jdGlvbihlbCkge1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cbiAgICB2YXIgZGF0ZUVscyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW8tY29tcG9uZW50PVwiby1kYXRlXCJdJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRlRWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGluaXQoZGF0ZUVsc1tpXSk7XG4gICAgfVxuICAgIGF1dG9VcGRhdGUoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1hdDogZm9ybWF0LFxuICAgIHRpbWVBZ286IHRpbWVBZ28sXG4gICAgaW5pdDogaW5pdCxcbiAgICBjcmVhdGVBbGxJbjogY3JlYXRlQWxsSW5cbn07Il19
