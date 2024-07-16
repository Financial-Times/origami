export async function getCurrentTab() {
	const queryOptions = {active: true, currentWindow: true};
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

export async function injectStyles() {
	const activeTab = await getCurrentTab();
	await chrome.scripting.insertCSS({
		target: {tabId: activeTab.id},
		files: ['styles/grid.css'],
	});
	await chrome.tabs.sendMessage(activeTab.id, {
		message: 'creteGridOverlay',
	});
	await chrome.storage.local.set({[activeTab.id.toString()]: true});
}

export async function removeStyles() {
	const activeTab = await getCurrentTab();
	await chrome.scripting.removeCSS({
		files: ['styles/grid.css'],
		target: {tabId: activeTab.id},
	});
	await chrome.tabs.sendMessage(activeTab.id, {
		message: 'removeGridOverlay',
	});
	await chrome.storage.local.set({[activeTab.id.toString()]: false});
}

export async function isGridEnabled() {
	const activeTab = await getCurrentTab();
	const data = await chrome.storage.local.get([activeTab.id.toString()]);
	return data[activeTab.id];
}
