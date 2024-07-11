async function getCurrentTab() {
	const queryOptions = {active: true, currentWindow: true};
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

export async function injectScripts() {
	const activeTab = await getCurrentTab();
	await chrome.scripting.executeScript({
		target: {tabId: activeTab.id},
		files: ['js/grid/grid.js'],
	});
	await chrome.scripting.insertCSS({
		target: {tabId: activeTab.id},
		files: ['styles/grid.css'],
	});
	await chrome.storage.local.set({origamiGridEnabled: true});
}

export async function removeStyles() {
	const activeTab = await getCurrentTab();
	await chrome.scripting.removeCSS({
		files: ['styles/grid.css'],
		target: {tabId: activeTab.id},
	});
	await chrome.storage.local.set({origamiGridEnabled: false});
}

export async function isGridEnabled() {
	const data = await chrome.storage.local.get(['origamiGridEnabled']);
	return data.origamiGridEnabled;
}
