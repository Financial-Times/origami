/* jshint browser:true */
/* global module:true */
'use strict';

function click(el) {
	var evt = document.createEvent('MouseEvent');
	evt.initMouseEvent(
		'click',
		true, // bubble,
		true, // cancelable
		window
	);
	el.dispatchEvent(evt);
}

module.exports = {
	click: click
};