const template = require('./src/js/template');
const timeoutDuration = 5000;

const stack = [];
const eventShow = (e) => show(e.detail);
let isInstantiated = false;
let container;

class Notice {

	constructor (options) {

		options.trackable = options.trackable || `notification-${options.type}`;

		this.notice = document.createElement('div');
		this.notice.appendChild(template(options));
		this.notice.querySelector('button').onclick = this.hide.bind(this);

		const firstChild = container.firstChild;
		container.insertBefore(this.notice, firstChild);

		if(options.duration !== 0){
			this.timeout = setTimeout(this.hide.bind(this), options.duration || timeoutDuration);
		}

		this.optionsContent = options.content;
	}

	hide() {
		clearTimeout(this.timeout);
		this.notice.parentNode.removeChild(this.notice);
		const index = stack.indexOf(this);
		if (index > -1) {
			stack.splice(index, 1);
		}
		this.dispatchNotificationCloseEvent();
	}

	dispatchNotificationCloseEvent () {
		document.dispatchEvent(new CustomEvent('nNotification.close'));
	}
}

function show (options) {
	if (!isInstantiated) {init();}
	if (stack.length > 0 && stack[stack.length - 1].optionsContent === options.content) {
		let lastNotice = stack[stack.length - 1];
		clearTimeout(lastNotice.timeout);
		lastNotice.timeout = setTimeout(lastNotice.hide.bind(lastNotice), timeoutDuration);
	} else {
		stack.push(new Notice(options));
	}
}

function init (){
	if (isInstantiated) return;

	container = document.createElement('div');
	container.className = ('n-notification');
	document.body.appendChild(container);
	document.addEventListener("nNotification.show", eventShow, false);
	isInstantiated = true;
}

function teardown() {
	stack.forEach(item => item.hide());
	stack.length = 0;
	container.parentNode.removeChild(container);
	document.removeEventListener("nNotification.show", eventShow, false);
	isInstantiated = false;
}

module.exports = {
	init: init,
	show: show,
	teardown: teardown
};
