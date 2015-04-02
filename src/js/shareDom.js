/*global module*/

function createInputEl(value) {
	"use strict";
	var inputEl = document.createElement('input');
	inputEl.setAttribute('type', 'text');
	inputEl.setAttribute('value', value);

	return inputEl;
}

function getPixelWidthOfText(text, refEl) {
	"use strict";
	var c = document.createElement("canvas");
	var ctx;
	var refElStyle;

	if (c.getContext && window.getComputedStyle) {
		ctx = c.getContext("2d");
		refElStyle = window.getComputedStyle(refEl);
		ctx.font = refElStyle.getPropertyValue('font-style') + " " + refElStyle.getPropertyValue('font-size') + " " + refElStyle.getPropertyValue('font-family');
		ctx.fillText(text, 10, 100);
		return ctx.measureText(text).width;
	}

	return -1;
}

module.exports.createInputEl = createInputEl;
module.exports.getPixelWidthOfText = getPixelWidthOfText;
