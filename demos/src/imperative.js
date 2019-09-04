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

let actionOptions = {
	type: 'action',
	content: {
		detail: 'Some request for action goes here.'
	},
	actions: {
		primary: {
			text: 'Action',
			link: '#'
		}
	},
	close: false
};

let innerOptions = Object.assign({}, options, {
	type: 'alert',
	inner: true,
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
		new Message(null, Object.assign({}, opts, variants));
	});
};

const initDemos = () => {
	setUpDemo('alert-success', options, {state: 'success'});
	setUpDemo('alert-neutral', options, {state: 'neutral'});
	setUpDemo('alert-error', options, {state: 'error'});

	setUpDemo('notice-inform', options, {type: 'notice', state: 'inform'});
	setUpDemo('notice-warning', options, {type: 'notice', state: 'warning'});
	setUpDemo('notice-warning-light', options, {type: 'notice', state: 'warning-light'});

	setUpDemo('inner-alert-success', innerOptions, {state: 'success'});
	setUpDemo('inner-alert-neutral', innerOptions, {state: 'neutral'});
	setUpDemo('inner-alert-error', innerOptions, {state: 'error', actions: null});

	setUpDemo('inner-notice-inform', innerOptions, {type: 'notice', state: 'inform'});
	setUpDemo('inner-notice-warning', innerOptions, {type: 'notice', state: 'warning'});
	setUpDemo('inner-notice-warning-light', innerOptions, {type: 'notice', state: 'warning-light'});

	setUpDemo('action-inform-inverse', actionOptions, {type: 'action', state: 'inform-inverse'});
};

document.addEventListener('DOMContentLoaded', () => {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));

	initDemos();
});
