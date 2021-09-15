let clickToCopy = false;

function oColorsDemoPalette() {
	const swatches = document.querySelectorAll('.swatch');

	for (const swatch of swatches) {
		const oColor = swatch.getAttribute('data-o-color');
		const hexInput = swatch.querySelector('.hex');
		const hex = window.getComputedStyle(document.body, null).getPropertyValue(`--o-colors-${oColor}`);
		hexInput.value = hex ? hex.trim() : '';

		if (clickToCopy) {
			swatch.addEventListener('click', oColorsCopy, false);
		}
	}
}

function oColorsCopy(event) {
	// find target element
	let input = event.target.querySelector('.hex');
	let parent = event.target;
	if (input === null && event.target.localName === 'input') {
		input = event.target.parentNode.querySelector('.hex');
		parent = event.target.parentNode;
	}

	// is element selectable?
	if (input && input.select) {
		// select text
		input.focus();
		input.select();

		try {
			// copy text
			document.execCommand('copy');
			input.blur();
			// Setting the class changes the :after content to read "Copied!"
			parent.classList.add('copied');
			// Remove the class after 2s
			setTimeout(function() {
				parent.classList.remove('copied');
			}, 2000);

		} catch (err) {
			console.log('Can not copy text. ', err);
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	const randomInput = document.querySelectorAll('input')[0];
	if (randomInput.select && document.execCommand) {
		document.body.classList.add('o-copy-true');
		clickToCopy = true;
	}

	oColorsDemoPalette();
});
