import gridStyles from '../styles/grid.css?raw';

export async function getCurrentTab() {
	const queryOptions = {active: true, currentWindow: true};
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

export async function injectStyles() {
	const activeTab = await getCurrentTab();

	await chrome.scripting.executeScript({
		target: {tabId: activeTab.id},
		func: css => {
			let styleTag = document.getElementById('o3-extension-grid-styles');
			if (!styleTag) {
				styleTag = document.createElement('style');
				styleTag.id = 'o3-extension-grid-styles';
				document.head.appendChild(styleTag);
			}
			styleTag.textContent = css;
		},
		args: [gridStyles],
	});

	await chrome.tabs.sendMessage(activeTab.id, {
		message: 'createGridOverlay',
	});
	await chrome.storage.local.set({[activeTab.id.toString()]: true});
}

export async function removeStyles() {
	const activeTab = await getCurrentTab();
	await chrome.scripting.executeScript({
		target: {tabId: activeTab.id},
		func: () => {
			const styleTag = document.getElementById('o3-extension-grid-styles');
			if (styleTag) {
				styleTag.remove();
			}
		},
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
