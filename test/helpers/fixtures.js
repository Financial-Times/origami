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
	const html = `
		<div class="tooltip-test-wrapper">
			<div class='tooltip-target' id="demo-tooltip-target">
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
	
			<button class='tooltip-target' id="demo-tooltip-target-3">
					Thing to point the tooltip at.
			</button>
	
			<div id="tooltip-demo-3"
				data-o-component="o-tooltip"
				data-o-tooltip-target="demo-tooltip-target-3"
				data-o-tooltip-show-on-click="true">
					Tooltip content
			</div>
	
			<div class='tooltip-target' id="demo-tooltip-target-4">
					Thing to point the tooltip at.
			</div>
	
			<div id="tooltip-demo-4"
				data-o-component="o-tooltip"
				data-o-tooltip-target="demo-tooltip-target-4"
				data-o-tooltip-show-on-hover="true">
					Tooltip content
			</div>
	
			<div class='tooltip-target' id="demo-tooltip-target-5" style='position:fixed'>
					Thing to point the tooltip at.
			</div>
	
			<div id="tooltip-demo-5"
				data-o-component="o-tooltip"
				data-o-tooltip-target="demo-tooltip-target-5"
				data-o-tooltip-show-on-hover="true">
					Tooltip content
			</div>
			
			<div id="tooltip-demo-6"
				data-o-component="o-tooltip"
				data-o-tooltip-target="demo-tooltip-target-6"
				data-o-tooltip-show-on-focus="true">
					Tooltip content
			</div>
			
			<div class='tooltip-target' id="demo-tooltip-target-6" style='position:fixed'>
					Thing to point the tooltip at.
			</div>
	
			<div class='tooltip-target' id="demo-tooltip-target-below">
					Thing to point the tooltip at.
			</div>
	
			<div id="tooltip-demo-below"
				data-o-tooltip-position="below"
				data-o-component="o-tooltip"
				data-o-tooltip-target="demo-tooltip-target-below"
				data-o-tooltip-show-on-hover="true">
					Tooltip content
			</div>
	
			<!-- note lack of whitespace is there to make sure there is no next sibling (otherwise text node :-O) -->
			<div id="demo-tooltip-insertion-test-1"><div class='tooltip-target' id="demo-tooltip-insertion-test-1-target">Thing to point the tooltip at.</div></div>
	
			<div id="demo-tooltip-insertion-test-2">
				<div class='tooltip-target' id="demo-tooltip-insertion-test-2-target">
					Thing to point the tooltip at.
				</div>
				<div></div>
			</div>
			
			<div id="demo-tooltip-removal-test-1">
				<div class='tooltip-target' id="demo-tooltip-removal-test-1-target">
					Thing to point the tooltip at.
				</div>
			</div>
		
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
