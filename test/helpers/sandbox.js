let sandboxEl;

export function init() {
	if (document.querySelector('.sandbox')) {
		sandboxEl = document.querySelector('.sandbox');
	} else {
		sandboxEl = document.createElement('div');
		sandboxEl.classList.add('sandbox');
		document.body.appendChild(sandboxEl);
	}
}

export function reset() {
	while (sandboxEl.firstChild) {
		sandboxEl.removeChild(sandboxEl.firstChild);
	}
}

export function setContents(html) {
	sandboxEl.innerHTML = html;
}

export function addContents(html) {
	sandboxEl.innerHTML = sandboxEl.innerHTML + html;
}
