const wrappers = Array.from(document.querySelectorAll('.demo-wrapper'));
const demoColors = Array.from(document.querySelectorAll('.demo-color'));
let activeUseCase = '';
let clickToCopy = false;

function oColorsDemoPalette() {
	const colorTints = ['white', 'black', 'claret', 'oxford', 'teal'];

	// Get the content property from the body element.
	// See demo.scss where a JSON-like string is added.
	const elem = document.querySelector('body');
	let CSSContent = window.getComputedStyle(elem, null).getPropertyValue("content");

	// Remove backslashes and first and last characters (quotes)
	// from string, then convert to object.
	CSSContent = CSSContent.replace(/\\/gi, '').slice(1, -1);
	const palette = JSON.parse(CSSContent);

	const swatches = document.querySelectorAll('.swatch');

	for (let swatch of swatches) {
		let oColor = swatch.getAttribute('data-o-color');
		let hexInput = swatch.querySelector('.hex');
		hexInput.value = palette[oColor];

		if (clickToCopy) {
			swatch.addEventListener('click', oColorsCopy, false);
		}
	}

	// populateTintDemos(palette, colorTints);
}


function oColorsUseCases() {
	const useCaseElems = document.querySelectorAll('.use-cases');

	for(let elem of useCaseElems) {
		const useCases = elem.textContent.split(', ');
		elem.innerHTML = '';

		for (let use of useCases) {
			let useClass = 'demo-color-for-' + use;
			elem.parentNode.classList.add(useClass);

			let button = document.createElement('button');
			button.textContent = use;
			button.className = 'o-buttons o-buttons--small o-buttons--uncolored';
			button.addEventListener('click', oColorsShowUseCases, false);
			elem.appendChild(button);
		}
	};
}

function oColorsShowUseCases() {
	const useCase = this.textContent;
	const useCaseClass = '.demo-color-for-' + useCase;

	const colors = document.querySelectorAll(useCaseClass);
	// const activeUseCases = document.querySelectorAll('.use-case-active');

	demoColors.forEach((color) => {
		color.classList.remove('use-case-active');
	});

	if (activeUseCase === useCase) {
		wrappers.forEach((wrapper) => {
			wrapper.classList.remove('use-cases-fade-out');
		});
		activeUseCase = '';
		return;
	}

	wrappers.forEach((wrapper) => {
		wrapper.classList.add('use-cases-fade-out');
	});

	colors.forEach((color) => {
		color.classList.add('use-case-active');
	});

	activeUseCase = useCase;
}

function populateTintDemos(palette, colors) {
	const tints = colors.map((color) => {
		let tintPalette = {'name': color};
		tintPalette.tints = Object.keys(palette).filter((palette_color) => {
			return palette_color.startsWith(color + '-');
		});
		return tintPalette;
	});

	tints.forEach((color) => {
		let name = color.name;
		let colorTints = color.tints;
		let colorElem = document.querySelector('.swatch.o-colors-palette-' + name + ' .demo-tints-container');

		let tintButton = document.querySelector('.demo-tint-button--' + name);
		tintButton.addEventListener('click', oColorsShowTints, false);

		colorTints.forEach((tint) => {
			let tintDiv = document.createElement('div');
			tintDiv.className = 'demo-tint o-colors-palette-' + tint;
			colorElem.appendChild(tintDiv);
		});
	});
}

function oColorsShowTints() {
	let tintContainer = this.closest('.demo-color').querySelector('.demo-tints-container');
	tintContainer.classList.toggle('show-me');
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

		} catch (err) {}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	let randomInput = document.querySelectorAll('input')[0];
	if (randomInput.select && document.execCommand) {
		document.body.classList.add('o-copy-true');
		clickToCopy = true;
	}

	oColorsDemoPalette();
	oColorsUseCases();
});
