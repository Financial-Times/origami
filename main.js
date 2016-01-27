const template = require('./src/js/template');
const timeoutDuration = 5000;

let isInstantiated = false;
let stack = [];
let container;

class Notice {

	constructor (options) {

		options.trackable = options.trackable || `notification-${options.type}`;

		this.notice = document.createElement('div');
		this.notice.innerHTML = template(options);
		this.notice.querySelector('button').onclick = this.hide.bind(this)

		const firstChild = container.firstChild;
		container.insertBefore(this.notice, firstChild);

		if(options.duration !== 0){
			this.timeout = setTimeout(this.hide.bind(this), options.duration || timeoutDuration);
		}
	}

	hide() {
		clearTimeout(this.timeout);
		this.notice.parentNode.removeChild(this.notice);
		const index = stack.indexOf(this);
		if (index > -1) {
			stack.splice(index, 1);	
		}
	}
}

function show (options){
	if (!isInstantiated) {init();}
	stack.push(new Notice(options));
}

function init (){
	if (isInstantiated) return;

	container = document.createElement('div');
	container.classList.add('n-notification');
	document.body.appendChild(container);

	isInstantiated = true;
}

function teardown() {
	stack.forEach(item => item.hide());
	stack.length = 0;
	container.parentNode.removeChild(container);
	isInstantiated = false;
}

module.exports = {
	show: show,
	teardown: teardown
};
