const template = require('./template');

const supportedTypes = ['error', 'success'];

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

		return this;
	}

	static dispatchNotificationCloseEvent() {
		document.dispatchEvent(new CustomEvent('nNotification.close'));
	}

	hide() {
		clearTimeout(this.timeout);
		this.clearToast(this);
		Toast.dispatchNotificationCloseEvent();

		if (this.options.returnFocusSelector) {
			this.options.returnFocusSelector.focus();
		}
	}
}

export default Toast;
