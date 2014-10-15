'use strict';

function initDemos() {
	require('../../main');

    var now = new Date();
    var today  = new Date();
    today.setHours(now.getHours() - 6);
    document.querySelector('time:not([datetime]').setAttribute('datetime', today.toISOString());

	document.addEventListener("DOMContentLoaded", function() {
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});
}

initDemos();

module.exports = initDemos;
