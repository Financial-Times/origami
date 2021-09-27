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
	const html = `<div>
		<audio class="o-audio" data-o-component="o-audio" id="element"></audio>
	</div>
	`;
	insert(html);
}

export {
	htmlCode,
	reset
};
