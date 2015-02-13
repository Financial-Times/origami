"use strict";

var Delegate = require('dom-delegate');

var templates = require('./js/templates');
var currentNotification = null;
var timeout;
var timeoutDuration = 5000;

function listenForCloseButtonClick(){
	var called = false;
	var func = function(){

		var delegate = new Delegate(document.body);
		delegate.on('click', '.notification__close', hideNotification);
	};

	if(!called){
		func();
		called = true;
	}
}

function showNotification(options){
	clearTimeout(timeout);
	listenForCloseButtonClick();
	if(currentNotification){
		currentNotification.firstChild.innerHTML = options.content;
	}else{
		var html = templates.notification(options.content);
		document.querySelector('header').insertAdjacentHTML('afterend', html);
		currentNotification = document.querySelector('.notification');
	}

	currentNotification.classList.add('visible');
	timeout = setTimeout(hideNotification, timeoutDuration);
}

function hideNotification(){
	clearTimeout(timeout);
	currentNotification.classList.remove('visible');
	setTimeout(function(){
		if(currentNotification && currentNotification.parentNode){
			currentNotification.parentNode.removeChild(currentNotification);
		}

		currentNotification = null;
	}, 1000);
}


document.addEventListener("FT.Notification", function(e){
	showNotification(e.detail);
});


module.exports = showNotification;

