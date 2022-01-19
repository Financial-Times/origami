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

function insertSimple() {
	const html = `
		<div data-o-component="o-tabs" class="o-tabs" role="tablist" data-o-tabs-update-url="true" id="tab-element">
			<a role="tab" aria-controls="tabContent1" href="#tabContent1">Tab 1</a>
			<a role="tab" aria-controls="tabContent2" href="#tabContent2">Tab 2</a>
			<a role="tab" aria-controls="tabContent3" href="#tabContent3">Tab 3</a>
		</div>
		<div id="tabContent1" class="o-tabs__tabpanel" role="tabpanel">Tab content 1</div>
		<div id="tabContent2" class="o-tabs__tabpanel" role="tabpanel">Tab content 2</div>
		<div id="tabContent3" class="o-tabs__tabpanel" role="tabpanel">Tab content 3</div>
	`;
	insert(html);
}

export {
	insertSimple,
	reset
};
