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
	const html = `<div id="element" class="o-example {{#theme}}o-example--{{theme}}{{/theme}}" data-o-component="o-example">
	Hello world, I am a component named o-example!
	<span class="o-example__counter">
		You have clicked this lovely button <span data-o-example-current-count>0</span> times.
		<button class="o-example__button">count</button>
	</span>
</div>
	`;
	insert(html);
}

export {
	htmlCode,
	reset
};
