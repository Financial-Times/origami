let sandboxEl;

function createSandbox() {
	if (document.querySelector('.sandbox')) {
		sandboxEl = document.querySelector('.sandbox');
	} else {
		sandboxEl = document.createElement('div');
		sandboxEl.setAttribute('class', 'sandbox');
		document.body.appendChild(sandboxEl);
	}
}

function reset() {
	sandboxEl.innerHTML = '';
}

function insert(html) {
	createSandbox();
	sandboxEl.innerHTML = html;
}

function htmlCode () {
	const viewportHeight = '600px';

	// Intersection observer targets must have dimensions.
	const styleAttribute = 'style="display: block; width: 10px; height: 10px; background: red;"';

	const html = `
		<div id="scrollable" style="width: 100px; height: ${viewportHeight}; overflow: scroll;">
			<hr style="margin-bottom: ${viewportHeight}; border-width: 0;">

			<img class="o-lazy-load" data-src="path/to/img-1.jpg" ${styleAttribute}>

			<hr style="margin-bottom: ${viewportHeight}; border-width: 0;">

			<img class="o-lazy-load" data-srcset="path/to/img-2.jpg 800w" sizes="(min-width: 800px)" ${styleAttribute}>

			<hr style="margin-bottom: ${viewportHeight}; border-width: 0;">

			<div class="o-lazy-load" data-toggle-class="is-loaded" ${styleAttribute}></div>

			<hr style="margin-bottom: ${viewportHeight}; border-width: 0;">

			<picture class="o-lazy-load" ${styleAttribute}>
				<source data-srcset="path/to/img-s.jpg" media="screen and (max-width: 480px)">
				<img data-src="path/to/img-l.jpg" alt="">
			</picture>
		</div>
	`;

	insert(html);
}

export {
	htmlCode,
	reset
};