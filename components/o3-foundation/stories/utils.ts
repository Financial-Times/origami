export function transformCode(code: string) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(code, 'text/html');

	// Remove the edit panel
	let editPanel = doc.querySelector('.edit-panel');
	if (editPanel) {
		editPanel.remove();
	}

	// Remove the class 'o3-grid-item' from all items
	let gridItems = doc.querySelectorAll('.o3-grid-item');
	gridItems.forEach(item => {
		item.removeAttribute('class');
	});

	// Serialize the modified DOM back to a string
	let modifiedHtmlString = doc.body.innerHTML;
	return modifiedHtmlString
}
