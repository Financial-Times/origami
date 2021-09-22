import template from './template';

const supportedTypes = ['error', 'success'];

const isVisible = function (element) {
	return !!element.offsetHeight;
};

// Focus trap is an accessibility technique to keep users' focus within the toast window
const focusTrap = function(event) {
	const tabKeyCode = 9;
	const toastFocusableElements = [].slice.call(
		this.rootEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
	).filter(element => isVisible(element) && !element.disabled);

	if (toastFocusableElements.length && event.keyCode === tabKeyCode) {
		const lastElement = toastFocusableElements[toastFocusableElements.length - 1];
		// Loop focus back to the first element if focus has reached the focusable element
		if (event.target === lastElement) {
			toastFocusableElements[0].focus();
			event.preventDefault();
		} else if (event.shiftKey && event.target === toastFocusableElements[0]) { // loop to the bottom when shift+tabbing.
			lastElement.focus();
			event.preventDefault();
		}
	}
};

class Toast {
	constructor(options, clearToast) {
		this.clearToast = clearToast;

		options.trackable = options.trackable || `notification-${options.type}`;

		if (options.type && supportedTypes.includes(options.type)) {
			options.modifier = options.type;
		}

		options.returnFocusSelector =
			options.returnFocusSelector instanceof Element
				? options.returnFocusSelector
				: document.querySelector(options.returnFocusSelector);
		this.options = options;

		this.rootEl = document.createElement('div');
		this.rootEl.appendChild(template(options));
		this.rootEl.querySelector('button').onclick = this.hide.bind(this);

		if (options.duration !== 0) {
			this.timeout = setTimeout(this.hide.bind(this), options.duration);
		}

		this.optionsContent = options.content;

		document.addEventListener('keydown', focusTrap.bind(this));

		return this;
	}

	static dispatchNotificationCloseEvent() {
		document.dispatchEvent(new CustomEvent('nNotification.close'));
	}

	hide() {
		clearTimeout(this.timeout);
		this.clearToast(this);
		Toast.dispatchNotificationCloseEvent();

		document.removeEventListener('keydown', focusTrap);

		if (this.options.returnFocusSelector) {
			this.options.returnFocusSelector.focus();
		}
	}
}

export default Toast;
