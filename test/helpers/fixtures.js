'use strict';
var sandboxEl;

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

function insertShareLinks() {
	let html = `
		<div data-o-component="o-share" class="o-share">
		<ul>
		<li class="o-share__action o-share__action--url">
		<a href="http://on.ft.com/1mUdgA2"><i>URL</i></a>
		</li>
		<li class="o-share__action o-share__action--twitter">
		<a href="https://twitter.com/intent/tweet?url=http:&#x2F;&#x2F;on.ft.com&#x2F;1mUdgA2&text=Pfizer+says+its+AstraZeneca+vow+over+big+UK+presence+is+binding&related=ftcompanies&via=FT"><i>Twitter</i></a>
		</li>
		</ul>
		</div>
		`;
	insert(html);
}

export {
	insertShareLinks,
	reset
};
