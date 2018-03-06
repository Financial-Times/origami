/*global require*/
import Message from './../../main.js';

let options = {
	type: 'alert',
	content: {
		highlight: 'Highlight!',
		detail: 'Details about the message go here.'
	},
	actions: {
		primary: {
			text: 'Button'
		},
		secondary: {
			text: 'Relevant Link'
		},
	}
}

let innerOptions = Object.assign({}, options, {
	type: 'alert-inner',
	parentElement: '.demo-inner',
	content: {
		highlight: 'Highlight!',
		detail: 'Details about the message go here.',
		additionalInfo: 'If there is more to say about this, please feel free to say it here.'
	}
});

const deleteElementsByClassName  = (className) => {
	const elementsWithThisClass = document.getElementsByClassName(className);
	while (elementsWithThisClass[0]) {
		elementsWithThisClass[0].remove();
	}
}

const setUpDemo = (id, opts, variants) => {
	document.getElementById(id).addEventListener('click', () => {
		deleteElementsByClassName('o-message');
		return new Message(null, Object.assign({}, opts, variants));
	});
}

const initDemos = () => {
	setUpDemo('alert-success', options, {status: 'success'});
	setUpDemo('alert-neutral', options, {status: 'neutral'});
	setUpDemo('alert-error', options, {status: 'error'});
	setUpDemo('alert-error-bleed', options, {status: 'error', type: 'alert-bleed'});

	setUpDemo('inner-success', innerOptions, {status: 'success'});
	setUpDemo('inner-neutral', innerOptions, {status: 'neutral'});
	setUpDemo('inner-error', innerOptions, {status: 'error'});
}

document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

	initDemos();
});
