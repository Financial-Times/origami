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


function declarativeCode () {
	const html = `<div class='tooltip-target' id="demo-tooltip-target">
			Thing to point the tooltip at.
		</div>

		<div id='tooltip-demo' data-o-component="o-tooltip"
		data-o-tooltip-target='demo-tooltip-target'>
			Tooltip content
		</div>
		<div class='tooltip-target' id="demo-tooltip-target-2">
				Thing to point the tooltip at.
			</div>

			<div id='tooltip-demo-2' data-o-component="o-tooltip"
			data-o-tooltip-target='demo-tooltip-target-2'>
				Tooltip content
			</div>
	`;
	insert(html);
}

function imperativeCode () {
	const html = `<div class='tooltip-target' id="demo-tooltip-target">
			Thing to point the tooltip at.
		</div>
	`;
	insert(html);
}

export {
	declarativeCode,
	imperativeCode,
	reset
 };
