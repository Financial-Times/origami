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

function streamMarkup () {
	const html = `<div>
		<div data-o-component="o-comments" data-o-comments-article-id="id"></div>
	</div>
	`;
	insert(html);
}

function countMarkup () {
	const html = `<div>
		<div data-o-component="o-comments" data-o-comments-count data-o-comments-article-id="id"></div>
	</div>
	`;
	insert(html);
}

export {
	reset,
	streamMarkup,
	countMarkup
};
