import {injectStyles, removeStyles} from './utils.js';

chrome.tabs.onUpdated.addListener((tabId, info) => {
	if (info.status === 'complete') {
		chrome.storage.local.get([tabId.toString()], function (data) {
			if (data[tabId]) {
				injectStyles();
			} else {
				removeStyles();
			}
		});
	}
});

chrome.tabs.onRemoved.addListener(() => {
	removeStyles();
});
