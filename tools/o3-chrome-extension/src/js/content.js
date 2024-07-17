chrome.runtime.onMessage.addListener(request => {
	if (request.message === 'creteGridOverlay') {
		initObserver();
		createGridOverlay();
	} else if (request.message === 'removeGridOverlay') {
		removeObserver();
		removeGridOverlay();
	} else if (request.message === 'updateGridColors') {
		updateColorCustomProperties(request.colors);
	}
});

window.addEventListener('load', () => {
	initObserver();
});

function initObserver() {
	if (window.gridResizeObserver) {
		window.gridResizeObserver.disconnect();
	}

	window.gridResizeObserver = new ResizeObserver(() => {
		updateGridOverlay();
	});

	window.gridResizeObserver.observe(document.body);
}

function removeObserver() {
	if (window.gridResizeObserver) {
		window.gridResizeObserver.disconnect();
	}
	delete window.gridResizeObserver;
}

function createGridOverlay() {
	let gridOverlayContainer = document.querySelector('.o3-grid-extension-overlay');
	if (gridOverlayContainer) {
		return;
	}
	gridOverlayContainer = document.createElement('div');
	gridOverlayContainer.classList.add('o3-grid-extension-overlay');
	const gridExtension = document.createElement('div');
	gridExtension.classList.add('o3-grid-extension');
	chrome.storage.local.get(['gridColorSettings'], result => {
		if (result.gridColorSettings) {
			updateColorCustomProperties(result.gridColorSettings);
		}
	});
	gridOverlayContainer.appendChild(gridExtension);
	document.body.appendChild(gridOverlayContainer);
}

function updateGridOverlay() {
	const existingOverlay = document.querySelector('.o3-grid-extension-overlay');
	if (existingOverlay) {
		const gridExtension = document.querySelector('.o3-grid-extension');
		const gridItems = document.querySelectorAll('.o3-grid-extension-grid-item');
		const currentColumns = getColumnCount(gridExtension);

		if (currentColumns !== gridItems.length) {
			gridExtension.innerHTML = '';
			for (let i = 0; i < currentColumns; i++) {
				const gridItem = document.createElement('div');
				gridItem.classList.add('o3-grid-extension-grid-item');
				gridExtension.appendChild(gridItem);
			}
		}
	}
}

function removeGridOverlay() {
	const gridOverlay = document.querySelector('.o3-grid-extension-overlay');
	if (gridOverlay) {
		gridOverlay.remove();
	}
}

function getColumnCount(gridExtension) {
	if (gridExtension) {
		const columns =
			getComputedStyle(gridExtension).getPropertyValue('--columns');
		return parseInt(columns, 10);
	}
	return 4;
}

function updateColorCustomProperties(colors) {
	const {columnColor, gutterColor, marginColor, colorOpacity} = colors;
	const gridExtension = document.querySelector('.o3-grid-extension');

	gridExtension.style.setProperty(
		'--color-column',
		hexToRGBA(columnColor, colorOpacity)
	);
	gridExtension.style.setProperty(
		'--color-gutter',
		hexToRGBA(gutterColor, colorOpacity)
	);
	gridExtension.style.setProperty(
		'--color-margin',
		hexToRGBA(marginColor, colorOpacity)
	);
	gridExtension.style.setProperty(
		'--color-text-description',
		hexToRGBA(columnColor, 1)
	);

	chrome.storage.local.set({
		['gridColorSettings']: {
			columnColor,
			gutterColor,
			marginColor,
			colorOpacity,
		},
	});
}

function hexToRGBA(hex, opacity) {
	hex = hex.replace(/^#/, '');

	// Parse the r, g, b values
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	// Ensure opacity is a number between 0 and 1
	if (opacity > 1) {
		opacity = opacity / 100;
	}
	// Return the rgba string
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
