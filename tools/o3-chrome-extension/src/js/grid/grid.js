createGridOverlay();
window.addEventListener('resize', updateGridOverlay);

// Create the grid overlay
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
	const windowWidth = window.innerWidth;
	if (windowWidth >= 980) {
		return 12;
	} else if (windowWidth >= 740) {
		return 8;
	} else {
		return 4;
	}
}
