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

function simple () {
	const html = `
	<div data-o-component="o-expander" class="o-expander items" data-o-expander-shrink-to="2" data-o-expander-count-selector="li" id="element">
		<h2>Collapsing to number of items in a list</h2>
		<ul class="o-expander__content">
			<li>item</li>
			<li>item</li>
			<li>item</li>
			<li>item</li>
		</ul>
		<a href='#' class="o-expander__toggle o--if-js click-for-testing"></a>
	</div>

	<div data-o-component="o-expander" class="o-expander height" data-o-expander-shrink-to="height">
		<h2>Collapsing to height of content (resize window to see toggle appear and disappear in a content-aware manner)</h2>
		<div class="o-expander__content">
			word word word word word word word word word word word word word word word word word word word word word word
		</div>
		<a href='#' class="o-expander__toggle o--if-js"></a>
	</div>


	<div data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="hidden">
		<h2>Hiding content</h2>
		<div class="o-expander__content">
			word word word word word word word word word word word word word word word word word word word word word word
		</div>
		<a href='#' class="o-expander__toggle o--if-js"></a>
	</div>

	`;
	insert(html);
}

export {
	simple,
	reset
};
