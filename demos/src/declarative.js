'use strict';

var now = new Date();
var today  = new Date();
today.setHours(now.getHours() - 6);
document.querySelector('time:not([datetime]').setAttribute('datetime', today.toISOString());

require('./demo');
