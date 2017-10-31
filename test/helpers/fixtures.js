let sandboxEl;

function createSandbox() {
	if (document.querySelector('.sandbox')) {
		sandboxEl = document.querySelector('.sandbox');
	} else {
		sandboxEl = document.createElement('div');
		sandboxEl.setAttribute('class', 'sandbox');
		document.body.appendChild(sandboxEl);
	}

	// oTypography should be run on the HTML element only
	document.documentElement.setAttribute('data-o-component', 'o-typography');
}

function reset() {
	sandboxEl.innerHTML = '';
}

function insert(html) {
	createSandbox();
	sandboxEl.innerHTML = html;
}

function htmlCode () {
	const html = `<div>
		<h1>Basic Demo</h1>
		<div class="o-typography" data-o-component="o-typography" id="element"></div>
	</div>
	`;
	insert(html);
}

export {
	htmlCode,
	reset
};
