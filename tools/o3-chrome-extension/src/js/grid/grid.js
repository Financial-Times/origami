let resizeObserver;

function createGridOverlay() {
	if (document.querySelector('.o3-grid-extension-overlay')) {
		return;
	}
	const gridOverlayContainer = document.createElement('div');
	const gridExtension = document.createElement('div');
	gridOverlayContainer.appendChild(gridExtension);
	gridOverlayContainer.classList.add('o3-grid-extension-overlay');
	gridExtension.classList.add('o3-grid-extension');

	const columns = getColumnCount();

	for (let i = 0; i < columns; i++) {
		const gridItem = document.createElement('div');
		gridItem.classList.add('o3-grid-extension-grid-item');
		gridExtension.appendChild(gridItem);
	}

	document.body.appendChild(gridOverlayContainer);
}

function updateGridOverlay() {
	const existingOverlay = document.querySelector('.o3-grid-extension-overlay');
	if (existingOverlay) {
		const currentColumns = getColumnCount();

		const gridExtension = document.querySelector('.o3-grid-extension');
		const gridItems = document.querySelectorAll('.o3-grid-extension-grid-item');

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

function getColumnCount() {
	const gridExtension = document.querySelector('.o3-grid-extension');
	if (gridExtension) {
		const columns =
			getComputedStyle(gridExtension).getPropertyValue('--columns');
		return parseInt(columns, 10);
	}
	return 4;
}

function initObserver() {
	if (resizeObserver) {
		resizeObserver.disconnect();
	}

	resizeObserver = new ResizeObserver(() => {
		updateGridOverlay();
	});

	resizeObserver.observe(document.body);
}

window.addEventListener('load', () => {
	createGridOverlay();
	initObserver();
});
