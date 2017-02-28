function oColorsDemoPalette() {
	const skipColors = ['transparent', 'inherit'];
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
}

document.addEventListener('DOMContentLoaded', function() {
	oColorsDemoPalette();
});
