'use strict';

var jsdom = require('jsdom');
var test = require("tape").test;
var oDate = require('../main');//.readFileSync("../main.js", "utf-8");

test('formatting dates using standard formats', function (t) {
    var date = new Date(2000, 5, 15, 6, 37, 22, 499);
    var expected = 'June 15, 2000 6:37 am';
    var isoDate = date.toISOString();
    
    t.plan(5);
    t.equal(oDate.format(date), expected);
    t.equal(oDate.format(isoDate), expected);
    t.equal(oDate.format(date, 'datetime'), expected);
    t.equal(oDate.format(date, 'date'), expected.replace(' 6:37 am', ''));
    // testing padding
    t.equal(oDate.format(new Date(2000, 5, 15, 6, 7), 'datetime'), 'June 15, 2000 6:07 am');
});

test('formatting dates using custom formats', function (t) {
    var date = new Date(2000, 1, 5, 6, 7, 22, 499);
    
    t.plan(8);

    t.equal(oDate.format(date, 'yyyy yy'), '2000 00'); 
    t.equal(oDate.format(date, 'MMMM MMM MM M'), 'February Feb 02 2');
    t.equal(oDate.format(date, 'EEEE EEE'), 'Saturday Sat');
    t.equal(oDate.format(date, 'd dd'), '5 05');
    t.equal(oDate.format(date, 'h hh'), '6 06');
    t.equal(oDate.format(date, 'm mm'), '7 07');
    t.equal(oDate.format(date, 'a'), 'am');
    t.equal(oDate.format(date, 'This is \\a co\\mmon string mm'), 'This is a common string 07');
});

test('getting time ago', function (t) {
    var formatsLow = {
        '2 seconds ago': 2,
        'a minute ago': 45,
        '2 minutes ago': 90,
        'an hour ago': 45 * 60,
        '2 hours ago': 90 * 60,
        'a day ago': 22 * 60 * 60,
        '2 days ago': 36 * 60 * 60,
        'a month ago': 25 * 60 * 60 * 24,
        '2 months ago': 45 * 60 * 60 * 24,
        'a year ago': 345 * 60 * 60 * 24,
        '2 years ago': 547 * 60 * 60 * 24,
    };
    var formatsHigh = {
        '44 seconds ago': (45) - 1,
        'a minute ago': (90) - 1,
        '45 minutes ago': (45 * 60) - 1,
        'an hour ago': (90 * 60) - 1,
        '22 hours ago': (22 * 60 * 60) - 1,
        'a day ago': (36 * 60 * 60) - 1,
        '25 days ago': (25 * 60 * 60 * 24) - 1,
        'a month ago': (45 * 60 * 60 * 24) - 1,
        '11 months ago': (345 * 60 * 60 * 24) - 1,
        'a year ago': (547 * 60 * 60 * 24) - 1,
    };
    t.plan(Object.keys(formatsLow).length + Object.keys(formatsHigh).length);

    Object.keys(formatsLow).forEach(function (format) {
        var date = new Date();
        date = date - (formatsLow[format] * 1000);
        t.equal(oDate.timeAgo(date), format);
    });

    Object.keys(formatsHigh).forEach(function (format) {
        var date = new Date();
        date = date - (formatsHigh[format] * 1000);
        t.equal(oDate.timeAgo(date), format);
    });
});


test('writing to the DOM', function (t) {

    var date = new Date(2000, 5, 15, 6, 37, 22, 499);
    var expected = 'June 15, 2000 6:37 am';
    var isoDate = date.toISOString();
    var endCount = 0;

    function end () {
        if (endCount === 2) {
            t.end();
        } else {
            endCount++;
        }
    }

    t.plan(8);

    jsdom.env('<time datetime="' + isoDate + '">dummy stuff</time>', [], function (errors, window) {
        // function mockTimeout (window) {
        //     var toCall;
        //     window.setTimeout = function (func) {
        //         toCall = func;
        //     };

        //     return function () {
        //         toCall();
        //     };
        // }

        // var tick = mockTimeout(window);
        var el = window.document.querySelector('time');
        oDate.init(el, true);
        t.equal(el.getAttribute('datetime'), isoDate);
        t.equal(el.innerHTML, oDate.timeAgo(date));
        t.equal(el.title, oDate.format(date));
        el.datetime = (new Date()).toISOString();
        // tick();
        // t.ok(el.innerHTML.indexOf('seconds ago') > -1);
        window.close();
        end();
    });

    jsdom.env('<time datetime="' + isoDate + '"><span>dummy stuff</span><span class="o-date__printer"></span></time>', [], function (errors, window) {
        oDate.init(window.document);
        var el = window.document.querySelector('time');
        t.equal(el.querySelector('.o-date__printer').innerHTML, oDate.timeAgo(date));
        t.equal(el.textContent, 'dummy stuff' + oDate.timeAgo(date));
        window.close();
        end();
    });

    jsdom.env('<time datetime="' + isoDate + '"></time><div>' +
        '<time class="o-date--ignore" datetime="' + isoDate + '"></time>' +
        '<time datetime="' + isoDate.replace('2000-06-15', '2014-05-20') + '"></time>' +
        '<time datetime="' + isoDate + '"></time>' +
        '</div>', [], function (errors, window) {
        oDate.init(window.document.querySelector('div'));
        var times = window.document.querySelectorAll('time');
        t.notOk(times[0].textContent, 'no update outside of scanned area');
        t.notOk(times[1].textContent, 'no update if has class o-date--ignore');
        t.notEqual(times[2].title, times[3].title);
        window.close();
        end();
    });

});


// test("make sure the thingie is a thing", function (t) {
//   t.equal(thingie, "thing", "thingie should be thing")
//   t.deepEqual(array, ["foo", "bar"], "array has foo and bar elements")
//   t.deepEqual(object, {foo: 42}, "object has foo property")
//   t.type(thingie, "string", "type of thingie is string")
//   t.ok(true, "this is always true")
//   t.notOk(false, "this is never true")
//   t.test("a child test", function (t) {
//     t.equal(this, superEasy, "right!?")
//     t.similar(7, 2, "ever notice 7 is kinda like 2?", {todo: true})
//     t.test("so skippable", {skip: true}, function (t) {
//       t.plan(1) // only one test in this block
//       t.ok(true, "but when the flag changes, it'll pass")
//       // no need to end, since we had a plan.
//     })
//     t.end()
//   })
//   t.ok(99, "can also skip individual assertions", {skip: true})
//   // end lets it know it's over.
//   t.end()
// })
// test("another one", function (t) {
//   t.plan(1)
//   t.ok(true, "It's ok to plan, and also end.  Watch.")
//   t.end() // but it must match the plan!
// })
