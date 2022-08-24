import '@financial-times/o-autoinit';

const oCopyClass = 'o-copy-true';

function oColorsDemoPalette() {
	const swatches = document.querySelectorAll('.swatch');

	for (const swatch of swatches) {
		const oColor = swatch.getAttribute('data-o-color');
		const hexElement = swatch.querySelector('.hex');

		const hex = window
			.getComputedStyle(document.body, null)
			.getPropertyValue(`--o-colors-${oColor}`);

		hexElement.textContent = hex ? hex.trim() : '';

		if (document.body.classList.contains(oCopyClass)) {
			swatch.addEventListener('click', oColorsCopy, false);
		}
	}
}

const sleep = time => new Promise(yay => setTimeout(yay, time));

function oColorsCopy(event) {
	// find target element
	const hexElement =
		event.target.querySelector('.hex') || event.target.closest('.hex');
	const container = hexElement.closest('.swatch');
	// copy text
	navigator.clipboard
		.writeText(hexElement.textContent)
		.then(() => {
			// Setting the class changes the :after content to read "Copied!"
			container.classList.add('copied');
			return sleep(2000);
		})
		.then(() => {
			container.classList.remove('copied');
		})
		.catch(error => {
			// eslint-disable-next-line no-console
			console.log('Can not copy text. ', error);
		});
}

document.addEventListener('DOMContentLoaded', function () {
	if (navigator.clipboard.writeText) {
		document.body.classList.add(oCopyClass);
	}

	oColorsDemoPalette();
});
