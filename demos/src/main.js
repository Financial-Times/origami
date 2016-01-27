const nNotification = require('../../main');
const demoMethod = document.querySelector('.demo-notification--method');
const demoCustom = document.querySelector('.demo-notification--error');

if (demoMethod) {
	demoMethod.addEventListener('click', function() {
		nNotification.show({
			title: 'Title',
			content: 'Notification generated via nNotification.show method'
		});
	});
}

if (demoCustom) {
	demoCustom.addEventListener('click', function() {
		nNotification.show({
			title: 'Error',
			content: 'This Notification is styled as an error',
			type: 'error'
		});
	});
}
