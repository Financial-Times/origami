"use strict";
var tracked = [];
var utils = require('./utils.js');


function Element(node) {
	if(!(this instanceof Element)) {
		new Element(node);
		return;
	}

	this.id = node.id;
	this.node = node;
	this.lastResult = null;
	this.getNodePosition(node);
	tracked.push(this);
}

Element.prototype.getNodePosition = function(){
	var rect = this.node.getBoundingClientRect();
	var scroll = utils.getScrollPosition();
	var top = this.top = scroll.y + rect.top;
	var left = this.left = scroll.x + rect.left;
	var bottom = this.bottom = top + rect.height;
	var right = this.right = left + rect.width;
	var area = this.area = rect.width * rect.height;
	return {
		top: top,
		left: left,
		bottom: bottom,
		right: right,
		area: area
	};
};

Element.prototype.percentInViewport = function () {
	var viewport = utils.getViewportSize();
	var scroll = utils.getScrollPosition();
	var inViewWidth = Math.min(this.bottom, (scroll.y + viewport.height)) - Math.max(this.top, scroll.y);
	var inViewHeight = Math.min(this.right, (scroll.x + viewport.width)) - Math.max(this.left, scroll.x);
	var percentage = (inViewWidth * inViewHeight) / (this.area / 100);
	if (inViewHeight > 0 && inViewWidth > 0 && percentage > 0) {
		return Math.round(percentage);
	} else {
		return 0;
	}
};

function updatePosition(event) {
	tracked.forEach(function (element){
		element.getNodePosition();
		update();
	});
}

function update(){
	tracked.forEach(function (element){
		if(element.lastResult !== element.percentInViewport()){
			var inView = element.lastResult = element.percentInViewport();
			utils.broadcast('inView', {
				element: element.node,
				inView: !!inView,
				inViewPercentage: inView
			}, element.node);
		}
	});
}

module.exports = {
	track: Element,
	tracked: tracked,
	updatePosition: updatePosition,
	update: update
};
