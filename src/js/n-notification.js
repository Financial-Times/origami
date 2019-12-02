import Toast from './toast';

const defaults = { duration: 5000 };
const stack = [];

const eventShow = e => show(e.detail);
let isInstantiated = false;
let container;

function init() {
	if (isInstantiated) {
		return;
	}

	container = document.createElement('div');
	container.className = 'n-notification';
	document.body.appendChild(container);
	document.addEventListener('nNotification.show', eventShow, false);
	isInstantiated = true;
}

function show(options) {
	options = Object.assign({}, defaults, options);

	if (!isInstantiated) {
		init();
	}
	if (
		stack.length > 0 &&
		stack[stack.length - 1].optionsContent === options.content
	) {
		let lastToast = stack[stack.length - 1];
		clearTimeout(lastToast.timeout);
		lastToast.timeout = setTimeout(
			lastToast.hide.bind(lastToast),
			options.duration
		);
	} else {
		const toast = new Toast(options, clearToast.bind(this));
		const firstChild = container.firstChild;
		container.insertBefore(toast.rootEl, firstChild);
		stack.push(toast);
	}

	if (options.focusSelector) {
		const focusEl =
			options.focusSelector instanceof Element
				? options.focusSelector
				: document.querySelector(options.focusSelector);
		if (focusEl) {
			focusEl.focus();
		}
	}
}

function clearToast(toast) {
	container.removeChild(toast.rootEl);
	const index = stack.indexOf(toast);
	if (index > -1) {
		stack.splice(index, 1);
	}
}

function destroy() {
	stack.forEach(item => item.hide());
	stack.length = 0;
	container.parentNode.removeChild(container);
	document.removeEventListener('nNotification.show', eventShow, false);
	isInstantiated = false;
}

export default {
	init,
	show,
	destroy
};
