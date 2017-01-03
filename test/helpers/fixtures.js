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

	const html = `<button class='toggle' data-o-component="o-toggle"
			data-o-toggle-target=".target"
			data-o-toggle-callback="document.querySelector('.target').classList.toggle('hidden');">Toggle</button>

	<div class="target">Target of the toggle</div>`;
	insert(html);
}

export {
	htmlCode,
	reset
};
