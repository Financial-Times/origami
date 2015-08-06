'use strict';

var times = document.querySelectorAll('[data-o-component="o-date"]');

var now = new Date();
var today  = new Date();
today.setHours(now.getHours() - 6);
var lastMonth = new Date();
lastMonth.setMonth(now.getMonth() - 6);

times[0].setAttribute('datetime', today.toISOString());
times[1].setAttribute('datetime', new Date(today.getTime() - (1000 * 60 * 60 * 20)).toISOString());
times[2].setAttribute('datetime', lastMonth.toISOString());

require('./demo');
