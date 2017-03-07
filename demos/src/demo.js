const wrappers = Array.from(document.querySelectorAll('.demo-wrapper'));
const demoColors = Array.from(document.querySelectorAll('.demo-color'));
let activeUseCase = '';

function oColorsDemoPalette() {
	const shadedColors = ['white', 'black', 'claret', 'blue', 'teal'];

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
		let hexSpan = swatch.querySelector('.hex');
		hexSpan.innerHTML = palette[oColor];
	}

	for (let color of shadedColors) {
		const colorElem = document.querySelector('[data-o-color='+color+']');
	}

	// const shades = buildShadedArrays(palette, shadedColors);
}


function oColorsUseCases() {
	const useCaseElems = document.querySelectorAll('.use-cases');

	const useCaseGroups = Array.from(useCaseElems, (elem) => {
		const useCases = elem.textContent.split(', ');
		elem.innerHTML = '';

		for (let use of useCases) {
			let useClass = 'demo-color-for-' + use;
			elem.parentNode.classList.add(useClass);

			let button = document.createElement('button');
			button.textContent = use;
			button.className = 'o-buttons o-buttons--small o-buttons--uncolored';
			button.addEventListener('click', oColorsShowUseCases);
			elem.appendChild(button);
		}
	});
}

function oColorsShowUseCases() {
	const useCase = this.textContent;
	const useCaseClass = '.demo-color-for-' + useCase;

	const colors = document.querySelectorAll(useCaseClass);
	const activeUseCases = document.querySelectorAll('.use-case-active');

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

// function buildShadedArrays(palette, colors) {
// 	const shades = colors.map((color) => {
// 		return Object.keys(palette).filter((palette_color) => {
// 			return palette_color.startsWith(color + '-');
// 		});
// 	});

// 	return shades;
// }

document.addEventListener('DOMContentLoaded', function() {
	oColorsDemoPalette();
	oColorsUseCases();
});
