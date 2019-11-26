const nNotification = require('../../main');
const demoEvent = document.querySelector('.demo-notification--event');
const demoMethod = document.querySelector('.demo-notification--method');
const demoError = document.querySelector('.demo-notification--error');
const demoSuccess = document.querySelector('.demo-notification--success');
const demoKeep = document.querySelector('.demo-notification--keep');

if (demoEvent) {
	demoEvent.addEventListener('click', function() {
		nNotification.init();
		const event = new CustomEvent('nNotification.show', {
			detail: {
				title: 'Title',
				content: 'Notification generated via Custom Event'
			}
		});
		document.dispatchEvent(event);
	});
}

if (demoMethod) {
	demoMethod.addEventListener('click', function() {
		nNotification.show({
			title: 'Title',
			content:
				'Notification generated via nNotification.show method duration set at 5s (timeout default)'
		});
	});
}

if (demoError) {
	demoError.addEventListener('click', function() {
		nNotification.show({
			title: 'Error',
			content: 'This Notification is styled as an error, duration set at 4s',
			type: 'error',
			duration: 4000
		});
	});
}

if (demoSuccess) {
	demoSuccess.addEventListener('click', function() {
		nNotification.show({
			title: 'Success',
			content: 'This Notification is styled as a success, duration set at 3s',
			type: 'success',
			duration: 3000
		});
	});
}

if (demoKeep) {
	demoKeep.addEventListener('click', function() {
		nNotification.show({
			title: 'Explicit dismissal',
			content:
				'Notification generated via nNotification.show keep, duration 0 requires explicit dismissal',
			duration: 0
		});
	});
}
