const template = require('./src/js/template');
const timeoutDuration = 5000;

let isInstantiated = false;

class Notice {

	constructor (options) {

		options.trackable = options.trackable || `notification-${options.type}`;

		this.notice = document.createElement('div');
		this.notice.innerHTML = template(options);
		this.notice.querySelector('button').onclick = this.hide.bind(this)

		const notificationContainer = document.querySelector('.n-notification');
		const firstChild = notificationContainer.firstChild;
		notificationContainer.insertBefore(this.notice, firstChild);

		if(options.duration !== 0){
			this.timeout = setTimeout(this.hide.bind(this), options.duration || timeoutDuration);
		}
	}

	hide() {
		clearTimeout(this.timeout);
		this.notice.dispatchEvent(new CustomEvent('nNotification.close'));
		this.notice.parentNode.removeChild(this.notice);
	}
}

function show(options){
	if (!isInstantiated) {init();}
	new Notice(options);
}

function init(){
	if (isInstantiated) return;

	let container = document.createElement('div');
	container.classList.add('n-notification');
	document.body.appendChild(container);

	document.addEventListener("nNotification.show", function(e){
		show(e.detail);
	});

	isInstantiated = true;
}

module.exports = {
	init : init,
	show: show
};
