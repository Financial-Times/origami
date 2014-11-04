(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var times = document.querySelectorAll('time.o-date');

var now = new Date();
var today  = new Date();
today.setHours(now.getHours() - 6);
var lastMonth = new Date();
lastMonth.setMonth(now.getMonth() - 6);

times[0].setAttribute('datetime', today.toISOString());
times[1].setAttribute('datetime', lastMonth.toISOString());


require('../../main.js').init();
},{"../../main.js":2}],2:[function(require,module,exports){
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

function autoUpdate () {

    if (!timer) {
        timer = setTimeout (function exec () {
            document.querySelectorAll('.o-date', function (el) {
                showTimeAgo(el, el.getAttribute('datetime'));
            });
            setTimeout(exec, 60000);
        }, 600000);
    }
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
    var interval = interval || Math.round(((new Date()) - date) / 1000);
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
    el = el || document.body;
    if (el.tagName === 'TIME') {
        el.classList.add('o-date');
        ftTime(el);
    } else {
        Array.prototype.forEach.call(el.querySelectorAll('time.o-date'), function (el) {
            ftTime(el);
        });
    }

    autoUpdate();
}

module.exports = {
    format: format,
    timeAgo: timeAgo,
    init: init
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvb3JpZ2FtaS1idWlsZC10b29scy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvU2l0ZXMvby1tb2R1bGVzL28tZGF0ZS9kZW1vcy9zcmMvZGVtby5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1NpdGVzL28tbW9kdWxlcy9vLWRhdGUvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB0aW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RpbWUuby1kYXRlJyk7XG5cbnZhciBub3cgPSBuZXcgRGF0ZSgpO1xudmFyIHRvZGF5ICA9IG5ldyBEYXRlKCk7XG50b2RheS5zZXRIb3Vycyhub3cuZ2V0SG91cnMoKSAtIDYpO1xudmFyIGxhc3RNb250aCA9IG5ldyBEYXRlKCk7XG5sYXN0TW9udGguc2V0TW9udGgobm93LmdldE1vbnRoKCkgLSA2KTtcblxudGltZXNbMF0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIHRvZGF5LnRvSVNPU3RyaW5nKCkpO1xudGltZXNbMV0uc2V0QXR0cmlidXRlKCdkYXRldGltZScsIGxhc3RNb250aC50b0lTT1N0cmluZygpKTtcblxuXG5yZXF1aXJlKCcuLi8uLi9tYWluLmpzJykuaW5pdCgpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIG1vbnRocyA9ICdbXCInICsgJ0phbnVhcnksRmVicnVhcnksTWFyY2gsQXByaWwsTWF5LEp1bmUsSnVseSxBdWd1c3QsU2VwdGVtYmVyLE9jdG9iZXIsTm92ZW1iZXIsRGVjZW1iZXInLnNwbGl0KCcsJykuam9pbignXCIsXCInKSArICdcIl0nO1xudmFyIGRheXMgPSAnW1wiJyArICdTdW5kYXksTW9uZGF5LFR1ZXNkYXksV2VkbmVzZGF5LFRodXJzZGF5LEZyaWRheSxTYXR1cmRheScuc3BsaXQoJywnKS5qb2luKCdcIixcIicpICsgJ1wiXSc7XG52YXIgZm9ybWF0cyA9IHtcbiAgICBkYXRldGltZTogJ01NTU0gZCwgeXl5eSBoOm1tIGEnLFxuICAgIGRhdGU6ICdNTU1NIGQsIHl5eXknXG59O1xuXG52YXIgY29tcGlsZWRUZW1wbGF0ZXMgPSB7fTtcbnZhciB0aW1lcjtcblxuLypcbiAgICBTZWUgaHR0cDovL2RvY3Mub3JhY2xlLmNvbS9qYXZhc2UvNy9kb2NzL2FwaS9qYXZhL3RleHQvU2ltcGxlRGF0ZUZvcm1hdC5odG1sIGZvciBmb3JtYXR0aW5nIGNvbnZlbnRpb25zIHVzZWRcbiovXG52YXIgZm9ybWF0UmVwbGFjZW1lbnRzTWFwID0ge1xuICAgIE1NTU06ICdtb250aHNbZGF0ZS5nZXRNb250aCgpXScsXG4gICAgTU1NOiAnbW9udGhzW2RhdGUuZ2V0TW9udGgoKV0uc3Vic3RyKDAsMyknLFxuICAgIE1NOiAncGFkMihkYXRlLmdldE1vbnRoKCkgKyAxLCAyKScsXG4gICAgTTogJyhkYXRlLmdldE1vbnRoKCkgKyAxKScsXG4gICAgeXl5eTogJ2RhdGUuZ2V0RnVsbFllYXIoKScsXG4gICAgeXk6ICcoXCJcIitkYXRlLmdldEZ1bGxZZWFyKCkpLnN1YnN0cigtMiwgMiknLFxuICAgIEVFRUU6ICdkYXlzW2RhdGUuZ2V0RGF5KCldJyxcbiAgICBFRUU6ICdkYXlzW2RhdGUuZ2V0RGF5KCldLnN1YnN0cigwLDMpJyxcbiAgICBkOiAnZGF0ZS5nZXREYXRlKCknLFxuICAgIGRkOiAncGFkMihkYXRlLmdldERhdGUoKSwgMiknLFxuICAgIG06ICdkYXRlLmdldE1pbnV0ZXMoKScsXG4gICAgbW06ICdwYWQyKGRhdGUuZ2V0TWludXRlcygpLCAyKScsXG4gICAgaDogJygoZGF0ZS5nZXRIb3VycygpICUgMTIpKScsXG4gICAgaGg6ICdwYWQyKChkYXRlLmdldEhvdXJzKCkgJSAxMiksIDIpJyxcbiAgICBhOiAnKGRhdGUuZ2V0SG91cnMoKSA+PSAxMiA/IFwicG1cIiA6IFwiYW1cIiknXG59O1xuXG5mdW5jdGlvbiBjb21waWxlIChmb3JtYXQpIHtcbiAgICB2YXIgdHBsID0gZm9ybWF0c1tmb3JtYXRdIHx8IGZvcm1hdDtcbiAgICBcbiAgICB2YXIgZnVuY1N0cmluZyA9ICd2YXIgbW9udGhzPSAnICsgbW9udGhzICsgJywgZGF5cz0gJyArIGRheXMgKyAnOyc7XG4gICAgZnVuY1N0cmluZyArPSdmdW5jdGlvbiBwYWQyIChudW1iZXIpIHtyZXR1cm4gKFwiMFwiICsgbnVtYmVyKS5zbGljZSgtMil9JztcbiAgICBmdW5jU3RyaW5nICs9ICdyZXR1cm4gXCInICsgdHBsLnJlcGxhY2UoL1xcXFw/W2Etel0rL2lnLCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICAgICAgaWYgKG1hdGNoLmNoYXJBdCgwKSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2guc3Vic3RyKDEpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXBsYWNlciA9IGZvcm1hdFJlcGxhY2VtZW50c01hcFttYXRjaF07XG5cbiAgICAgICAgcmV0dXJuIHJlcGxhY2VyID8gJ1wiICsgJyArIHJlcGxhY2VyICsgJyArIFwiJyA6IG1hdGNoO1xuICAgIH0pICsgJ1wiJztcblxuICAgIHJldHVybiBGdW5jdGlvbignZGF0ZScsIGZ1bmNTdHJpbmcpO1xufVxuXG5mdW5jdGlvbiB0b0RhdGUgKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZSBpbnN0YW5jZW9mIERhdGUgPyBkYXRlIDogbmV3IERhdGUoZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdCAoZGF0ZSwgZm9ybWF0KSB7XG4gICAgZm9ybWF0ID0gZm9ybWF0IHx8ICdkYXRldGltZSc7XG4gICAgdmFyIHRwbCA9IGNvbXBpbGVkVGVtcGxhdGVzW2Zvcm1hdF0gfHwgY29tcGlsZShmb3JtYXQpO1xuICAgIHJldHVybiB0cGwodG9EYXRlKGRhdGUpKTtcbn1cblxuZnVuY3Rpb24gYXV0b1VwZGF0ZSAoKSB7XG5cbiAgICBpZiAoIXRpbWVyKSB7XG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCAoZnVuY3Rpb24gZXhlYyAoKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuby1kYXRlJywgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RpbWVBZ28oZWwsIGVsLmdldEF0dHJpYnV0ZSgnZGF0ZXRpbWUnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZXhlYywgNjAwMDApO1xuICAgICAgICB9LCA2MDAwMDApO1xuICAgIH1cbn1cblxuXG5mdW5jdGlvbiBmdFRpbWUoZWwpIHtcbiAgICB2YXIgZGF0ZSA9IHRvRGF0ZShlbC5nZXRBdHRyaWJ1dGUoJ2RhdGV0aW1lJykpO1xuICAgIHZhciBwcmludGVyID0gZWwucXVlcnlTZWxlY3RvcignLm8tZGF0ZV9fcHJpbnRlcicpIHx8IGVsO1xuICAgIHZhciBpbnRlcnZhbCA9IE1hdGgucm91bmQoKChuZXcgRGF0ZSgpKSAtIGRhdGUpIC8gMTAwMCk7XG4gICAgcHJpbnRlci5pbm5lckhUTUwgPSBpbnRlcnZhbCA8ICgzNjUgKiA2MCAqIDYwICogMjQpID8gdGltZUFnbyh0b0RhdGUoZGF0ZSksIGludGVydmFsKSA6IGZvcm1hdChkYXRlLCAnZGF0ZScpO1xuICAgIGVsLnRpdGxlID0gZm9ybWF0KGRhdGUsICdkYXRldGltZScpO1xufVxuXG5mdW5jdGlvbiB0aW1lQWdvIChkYXRlLCBpbnRlcnZhbCkge1xuICAgIGRhdGUgPSB0b0RhdGUoZGF0ZSk7XG4gICAgdmFyIGludGVydmFsID0gaW50ZXJ2YWwgfHwgTWF0aC5yb3VuZCgoKG5ldyBEYXRlKCkpIC0gZGF0ZSkgLyAxMDAwKTtcbiAgICBpZiAoaW50ZXJ2YWwgPCA0NSkge1xuICAgICAgICByZXR1cm4gaW50ZXJ2YWwgKyAnIHNlY29uZHMgYWdvJztcbiAgICB9IGVsc2UgaWYgKGludGVydmFsIDwgOTApIHtcbiAgICAgICAgcmV0dXJuICdhIG1pbnV0ZSBhZ28nO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCA0NSAqIDYwKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGludGVydmFsIC8gNjApICsgJyBtaW51dGVzIGFnbyc7XG4gICAgfSBlbHNlIGlmIChpbnRlcnZhbCA8IDkwICogNjApIHtcbiAgICAgICAgcmV0dXJuICdhbiBob3VyIGFnbyc7XG4gICAgfSBlbHNlIGlmIChpbnRlcnZhbCA8IDIyICogNjAgKiA2MCkge1xuICAgICAgICByZXR1cm4gIE1hdGgucm91bmQoaW50ZXJ2YWwgLyAoNjAgKiA2MCkpICsgJyBob3VycyBhZ28nO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAzNiAqIDYwICogNjApIHtcbiAgICAgICAgcmV0dXJuICdhIGRheSBhZ28nO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCAyNSAqIDYwICogNjAgKiAyNCkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChpbnRlcnZhbCAvICg2MCAqIDYwICogMjQpKSArICcgZGF5cyBhZ28nO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCA0NSAqIDYwICogNjAgKiAyNCkge1xuICAgICAgICByZXR1cm4gJ2EgbW9udGggYWdvJztcbiAgICB9IGVsc2UgaWYgKGludGVydmFsIDwgMzQ1ICogNjAgKiA2MCAqIDI0KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGludGVydmFsIC8gKDYwICogNjAgKiAyNCAqIDMwKSkgKyAnIG1vbnRocyBhZ28nO1xuICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWwgPCA1NDcgKiA2MCAqIDYwICogMjQpIHtcbiAgICAgICAgcmV0dXJuICdhIHllYXIgYWdvJztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMiwgTWF0aC5yb3VuZChpbnRlcnZhbCAvICg2MCAqIDYwICogMjQgKiAzNjUpKSkgKyAnIHllYXJzIGFnbyc7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbml0IChlbCkge1xuICAgIGVsID0gZWwgfHwgZG9jdW1lbnQuYm9keTtcbiAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ1RJTUUnKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ28tZGF0ZScpO1xuICAgICAgICBmdFRpbWUoZWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZWwucXVlcnlTZWxlY3RvckFsbCgndGltZS5vLWRhdGUnKSwgZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBmdFRpbWUoZWwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhdXRvVXBkYXRlKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGZvcm1hdDogZm9ybWF0LFxuICAgIHRpbWVBZ286IHRpbWVBZ28sXG4gICAgaW5pdDogaW5pdFxufTsiXX0=
