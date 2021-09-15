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
		<ul data-o-component="o-tabs" class="o-tabs" role="tablist" data-o-tabs-disablefocus="true" id="tab-element">
			<li role="tab" class="should-be-focusable"><a href="#tabContent1" class="should-not-be-focusable">Tab 1</a></li>
			<li role="tab" class="should-be-focusable"><a href="#tabContent2" class="should-not-be-focusable">Tab 2</a></li>
			<li role="tab" class="should-be-focusable"><a href="#tabContent3" class="should-not-be-focusable">Tab 3</a></li>
		</ul>
		<div id="tabContent1" class="o-tabs__tabpanel should-be-focusable" role="tabpanel">Tab content 1</div>
		<div id="tabContent2" class="o-tabs__tabpanel should-be-focusable" role="tabpanel">Tab content 2</div>
		<div id="tabContent3" class="o-tabs__tabpanel should-be-focusable" role="tabpanel">Tab content 3</div>
	`;
	insert(html);
}

export default {
	insertSimple,
	reset
};
