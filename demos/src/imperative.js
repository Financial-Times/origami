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
};

let innerOptions = Object.assign({}, options, {
	type: 'alert-inner',
	parentElement: '.demo-inner',
	content: {
		highlight: 'Highlight!',
		detail: 'Details about the message go here.',
		additionalInfo: 'If there is more to say about this, please feel free to say it here.'
	}
});

const deleteElementsByClassName = (className) => {
	const elementsWithThisClass = document.getElementsByClassName(className);
	while (elementsWithThisClass[0]) {
		elementsWithThisClass[0].remove();
	}
};

const setUpDemo = (id, opts, variants) => {
	document.getElementById(id).addEventListener('click', () => {
		deleteElementsByClassName('o-message');
		return new Message(null, Object.assign({}, opts, variants));
	});
};

const initDemos = () => {
	setUpDemo('alert-success', options, {status: 'success'});
	setUpDemo('alert-neutral', options, {status: 'neutral'});
	setUpDemo('alert-error', options, {status: 'error'});
	setUpDemo('alert-error-bleed', options, {status: 'error', type: 'alert-bleed'});

	setUpDemo('notice-inform', options, {type: 'notice', status: 'inform'});
	setUpDemo('notice-warning', options, {type: 'notice', status: 'warning'});
	setUpDemo('notice-warning-light', options, {type: 'notice', status: 'warning-light'});

	setUpDemo('inner-alert-success', innerOptions, {status: 'success'});
	setUpDemo('inner-alert-neutral', innerOptions, {status: 'neutral'});
	setUpDemo('inner-alert-error', innerOptions, {status: 'error'});

	setUpDemo('inner-notice-inform', innerOptions, {type: 'notice-inner', status: 'inform'});
	setUpDemo('inner-notice-warning', innerOptions, {type: 'notice-inner', status: 'warning'});
	setUpDemo('inner-notice-warning-light', innerOptions, {type: 'notice-inner', status: 'warning-light'});
};

document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

	initDemos();
});
