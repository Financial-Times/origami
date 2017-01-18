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
		<h1>Basic Demo</h1>
		<form data-o-component="o-forms" id="element">
			<div class="o-forms">
				<label for="o-forms-standard" class="o-forms__label">Text input</label>
				<input type="text" id="o-forms-standard" placeholder="placeholder" class="o-forms__text" />
			</div>

			<div class="o-forms">
				<label for="o-forms-standard" class="o-forms__label">Text input</label>
				<input type="email" id="o-forms-standard" placeholder="placeholder" class="o-forms__text" />
			</div>
		</form>
	</div>
	`;
	insert(html);
}

export {
	insert,
	htmlCode,
	reset
 };
