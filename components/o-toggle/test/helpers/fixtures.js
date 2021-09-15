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


function declarativeMarkup (callback) {

	const html = `
		<div class='declarativeToggleContainer'>
			<button
				data-o-component="o-toggle"
				data-o-toggle-target=".declarativeTestTarget"
				${callback ? `data-o-toggle-callback="${callback}"` : ''}
			>
				Toggle
			</button>
			<div class="declarativeTestTarget">Target of the toggle</div>
		</div>`;
	insert(html);
}

function imperativeMarkup () {
	const html = `<button data-o-component="o-toggle">Toggle</button>
			<div class="imperativeTestTarget">Target of the toggle</div>`;
	insert(html);
}

function twoTogglesOneTarget () {
	const html = `<button id="testToggle1" data-o-component="o-toggle" data-o-toggle-target=".twoTogglesTarget">Toggle</button>
		<button id="testToggle2" data-o-component="o-toggle" data-o-toggle-target=".twoTogglesTarget">Toggle</button>

		<div class="twoTogglesTarget">Target of the toggle</div>`;
	insert(html);
}

function toggleAsALink () {
	const html = `<a id="linkToggle" data-o-component="o-toggle" data-o-toggle-target=".linkTogglesTarget">Toggle</a>
		<div class="linkTogglesTarget">Target of the toggle</div>`;
	insert(html);
}

export {
	imperativeMarkup,
	declarativeMarkup,
	twoTogglesOneTarget,
	toggleAsALink,
	reset
};
