'use strict';

var nNotification = require('../../main');
nNotification.init();

document.querySelector('.demo-notification--event').addEventListener('click', function() {
	var event = new CustomEvent('nNotification.show', {detail:{
			content:'Notification generated via event',
			trackable:'event-notification'
		}
	});
	document.dispatchEvent(event);
});

document.querySelector('.demo-notification--method').addEventListener('click', function() {
	nNotification.show({
		title: 'Title',
		content: 'Notification generated via nNotification.show method'
	});
});

document.querySelector('.demo-notification--always-open').addEventListener('click', function() {
	nNotification.show({
		content: '<abbr title="myFT" class="myft-ui__icon"></abbr> This Notification will not close. Read and manage your alerts.',
		duration: 0
	});
});

document.querySelector('.demo-notification--custom').addEventListener('click', function() {
	nNotification.show({
		title: 'Custom',
		content: 'This Notification has custom styles',
		type: 'custom'
	});
});
