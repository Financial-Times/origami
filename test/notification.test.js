/* global describe, it, beforeEach afterEach*/

const proclaim = require('proclaim');

const helpers = require('./phantomjs-helpers.js');
const nNotification = require('../main.js');

describe('Notifications', () => {
	describe('Programatically', () => {
		const defaultDuration = 500;

		afterEach(() => {
			nNotification.destroy();
		});

		it('should display a notification with the expected content', () => {
			nNotification.show({ title: 'Title', content: 'Content' });
			proclaim.isNotNull(document.querySelector('.n-notification__item'));
			const content = document.querySelector('.n-notification__content')
				.innerHTML;
			proclaim.include(content, 'Content');
		});

		it('should display an error notification', () => {
			nNotification.show({ type: 'error' });
			proclaim.isNotNull(document.querySelector('.n-notification--error'));
		});

		it('should display a success notification', () => {
			nNotification.show({ type: 'success' });
			proclaim.isNotNull(document.querySelector('.n-notification--success'));
		});

		it('should not set modifier class for unsupported types', () => {
			nNotification.show({ type: 'indifferent' });
			proclaim.isNull(document.querySelector('.n-notification--indifferent'));
			proclaim.isNull(document.querySelector('.n-notification--default'));
		});

		it('should remove the message after the specified timeout', done => {
			nNotification.show({
				title: 'Title',
				content: 'Content',
				duration: defaultDuration
			});
			proclaim.isNotNull(document.querySelector('.n-notification__item'));

			setTimeout(() => {
				proclaim.isNull(document.querySelector('.n-notification__item'));
				done();
			}, defaultDuration + 1);
		});

		it('should hide the notification when the close button is clicked', () => {
			nNotification.show({ title: 'Title', content: 'Content' });
			proclaim.isNotNull(document.querySelector('.n-notification__item'));
			helpers.click(document.querySelector('.n-notification__close'));
			proclaim.isNull(document.querySelector('.n-notification__item'));
		});

		it('displays multiple messages stacked in the right order', () => {
			nNotification.show({ title: 'Title', content: 'First' });
			nNotification.show({ title: 'Title', content: 'Second' });
			nNotification.show({ title: 'Title', content: 'Third' });
			proclaim.equal(
				document.querySelectorAll('.n-notification__item').length,
				3
			);
			proclaim.include(
				document.querySelector('.n-notification__content').innerHTML,
				'Third'
			);
			helpers.click(document.querySelector('.n-notification__close'));
			proclaim.include(
				document.querySelector('.n-notification__content').innerHTML,
				'Second'
			);
		});
	});

	describe('Via Events', () => {
		beforeEach(() => {
			nNotification.init();
		});

		afterEach(() => {
			nNotification.destroy();
		});

		it('should create a notification when an event is triggered', () => {
			const event = new CustomEvent('nNotification.show', {
				detail: { content: 'Title' }
			});
			document.dispatchEvent(event);
			proclaim.isNotNull(document.querySelector('.n-notification__item'));
		});
	});

	describe('Destroy', () => {
		beforeEach(() => {
			nNotification.init();
		});

		it('should remove all trace of nNotification from the document', () => {
			proclaim.isNotNull(document.querySelector('.n-notification'));
			nNotification.destroy();
			const event = new CustomEvent('nNotification.show', {
				detail: { content: 'Title' }
			});
			document.dispatchEvent(event);
			proclaim.isNull(document.querySelector('.n-notification'));
		});
	});
});
