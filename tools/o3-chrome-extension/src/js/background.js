import {injectScripts, removeStyles} from './utils.js';

chrome.runtime.onMessage.addListener(message => {
	if (message.enableOrigamiGrid) {
		injectScripts();
	} else {
		removeStyles();
	}
});
