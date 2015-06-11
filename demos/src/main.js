'use strict';

var nNotification = require('../../main');
var demoEvent = document.querySelector('.demo-notification--event');
var demoMethod = document.querySelector('.demo-notification--method');
var demoAlwaysOpen = document.querySelector('.demo-notification--always-open');
var demoCustom = document.querySelector('.demo-notification--custom');

nNotification.init();

if (demoEvent) {
	demoEvent.addEventListener('click', function() {
		var event = new CustomEvent('nNotification.show', {detail:{
				content:'Notification generated via event',
				trackable:'event-notification'
			}
		});
		document.dispatchEvent(event);
	});
}

if (demoMethod) {
	demoMethod.addEventListener('click', function() {
		nNotification.show({
			title: 'Title',
			content: 'Notification generated via nNotification.show method'
		});
	});
}

if (demoAlwaysOpen) {
	demoAlwaysOpen.addEventListener('click', function() {
		nNotification.show({
			content: '<abbr title="myFT" class="myft-ui__icon"></abbr> This Notification will not close. Read and manage your alerts.',
			duration: 0
		});
	});
}

if (demoCustom) {
	demoCustom.addEventListener('click', function() {
		nNotification.show({
			title: 'Custom',
			content: 'This Notification has custom styles',
			type: 'custom'
		});
	});
}
