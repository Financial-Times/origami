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

function htmlCode() {
	const html = `
		<time id="element" data-o-component="o-date" class="o-date" datetime="2000-06-14T23:00:00.000Z">
			June 15, 2000
		</time>`;
	insert(html);
}

export {
	htmlCode,
	reset
};
