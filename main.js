const Delegate = require('ftdomdelegate');
const template = require('./src/js/template');
const timeoutDuration = 5000;
const animDuration = 500;

let timeout;
let currentNotification = null;

function dispatchNotificationCloseEvent(){
	document.dispatchEvent(new CustomEvent('nNotification.close'));
}

function listenForCloseButtonClick(){
	let called = false;
	const func = function(){
		const delegate = new Delegate(document.body);
		delegate.on('click', '.n-notification__close-js', hide);
	};

	if(!called){
		func();
		called = true;
	}
}

function show(options){
	clearTimeout(timeout);

	options.title = options.title || '';
	options.content = options.content || '';
	options.type = options.type || 'default';
	options.trackable = options.trackable || 'notification-'+options.type;

	listenForCloseButtonClick();
	if(currentNotification){
		currentNotification.parentNode.removeChild(currentNotification);
	}

	const html = template(options);
	document.body.insertAdjacentHTML('afterbegin', html);
	currentNotification = document.querySelector('.n-notification');

	if(options.close !== false) {
		currentNotification.classList.add('n-notification--show-close');
	}
	setTimeout(function() {
		currentNotification.classList.add('visible');
	}, 10); // delay so it animates in

	if(options.duration !== 0){
		timeout = setTimeout(hide, options.duration || timeoutDuration);
	}
}

function hide(){
	clearTimeout(timeout);
	currentNotification.classList.remove('visible');
	dispatchNotificationCloseEvent();
	setTimeout(function(){
		if(currentNotification && currentNotification.parentNode){
			currentNotification.parentNode.removeChild(currentNotification);
		}

		currentNotification = null;
	}, animDuration);
}

function init(){
	document.addEventListener("nNotification.show", function(e){
		show(e.detail);
	});
}

module.exports = {
	init : init,
	show: show,
	hide: hide
};
