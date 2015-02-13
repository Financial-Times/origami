"use strict";

var Delegate = require('dom-delegate');

var optin = require('./js/optin');

var templates = require('./js/templates');
var currentMessage = null;
var timeout;
var timeoutDuration = 5000;
var animDuration = 500;

function listenForCloseButtonClick(){
	var called = false;
	var func = function(){

		var delegate = new Delegate(document.body);
		delegate.on('click', '.message__close-js', hideMessage);
	};

	if(!called){
		func();
		called = true;
	}
}

function showMessage(options){
	clearTimeout(timeout);
	listenForCloseButtonClick();
	if(currentMessage){
		currentMessage.firstChild.innerHTML = options.content;
	}else{
		var html = templates[options.type](options.content);
		document.querySelector('header').insertAdjacentHTML('afterend', html);
		currentMessage = document.querySelector('.message');
	}

	currentMessage.classList.add('visible');
	if(options.duration !== 0){
		timeout = setTimeout(hideMessage, options.duration || timeoutDuration);
	}
}

function hideMessage(){
	clearTimeout(timeout);
	currentMessage.classList.remove('visible');
	setTimeout(function(){
		if(currentMessage && currentMessage.parentNode){
			currentMessage.parentNode.removeChild(currentMessage);
		}

		currentMessage = null;
	}, animDuration);
}


document.addEventListener("FT.Message", function(e){
	var data = e.detail;
	data.type = "message";
	showMessage(data);
});

optin();

module.exports = showMessage;

