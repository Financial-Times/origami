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
	<div data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="2" id="element">
		<h2>Collapsing to number of items in a list</h2>
		<ul class="o-expander__content">
			<li>item</li>
			<li>item</li>
			<li>item</li>
			<li>item</li>
		</ul>
		<a href='#' class="o-expander__toggle click-for-testing"></a>
	</div>

	<div data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="height">
		<h2>Collapsing to height of content (resize window to see toggle appear and disappear in a content-aware manner)</h2>
		<div class="o-expander__content" style="max-height: 0px; overflow: hidden;">
			word word word word word word word word word word word word word word word word word word word word word word
		</div>
		<a href='#' class="o-expander__toggle"></a>
	</div>

	<div data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="hidden">
		<h2>Hiding content</h2>
		<div class="o-expander__content">
			word word word word word word word word word word word word word word word word word word word word word word
		</div>
		<a href='#' class="o-expander__toggle"></a>
	</div>

	`;
	insert(html);
}

function manualInit () {
	const html = `
	<div id="expander" data-o-component="o-expander" class="o-expander">
		<h2>Collapsing to number of items in a list</h2>
		<ul id="expander-content" class="o-expander__content">
			<li>item</li>
			<li>item</li>
			<li>item</li>
			<li>item</li>
		</ul>
		<a href='#' id="expander-toggle" class="o-expander__toggle">default</a>
	</div>
	`;
	insert(html);
}

function custom () {
	const html = `
	<div id="expander" class="my-expander">
		<h2>Collapsing to number of items in a list</h2>
		<ul id="expander-content" class="my-expander__content">
			<li>item</li>
			<li>item</li>
			<li>item</li>
			<li>item</li>
		</ul>
		<a href='#' id="expander-toggle" class="my-expander__toggle">default</a>
	</div>
	`;
	insert(html);
}

function numberItemSelector () {
	const html = `
	<div id="expander" data-o-component="o-expander" class="o-expander" data-o-expander-shrink-to="2" data-o-expander-item-selector="p" id="element">
		<h2>Collapsing to number of items in a list</h2>
		<div id="expander-content" class="o-expander__content">
			<p>item</p>
			<p>item</p>
			<p>item</p>
			<p>item</p>
		</div>
		<a id="expander-toggle" href='#' class="o-expander__toggle click-for-testing"></a>
	</div>
	`;
	insert(html);
}

export {
	custom,
	numberItemSelector,
	manualInit,
	simple,
	reset
};
