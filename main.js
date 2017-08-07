const OToggle = require('o-toggle');
const toggleEl = document.querySelector('.o-toggle');
const toggle = new OToggle(toggleEl, {
	// Set target to the nearest 'my-target'
        target: '.my-target',
        callback: function(state, event) {
            if (state === 'open') {
                console.log('Target opened');
            } else if (state === 'close') {
                console.log('Target closed');
            }
        }
    });
