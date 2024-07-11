chrome.storage.local.get(['origamiGridEnabled'], function (data) {
	if (data.origamiGridEnabled) {
		chrome.runtime.sendMessage({enableOrigamiGrid: data.origamiGridEnabled});
	}
});
