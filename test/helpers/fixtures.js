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
		<form data-o-component="o-forms" id="element">
			<div class="o-forms">
				<label for="o-forms-standard" class="o-forms__label">Text input</label>
				<input type="text" id="required-input" placeholder="placeholder" class="o-forms__text" required />
			</div>

			<div class="o-forms">
				<label for="o-forms-standard" class="o-forms__label">Text input</label>
				<input type="email" id="standard-input" placeholder="placeholder" class="o-forms__text" />
			</div>

			<input type="submit">
		</form>
	</div>
	`;
	insert(html);
}

function allInputsHtmlCode () {
	const html = `<div>
		<form data-o-component="o-forms" id="element">
			<input type="text" id="required-input" placeholder="placeholder" class="o-forms__text" required />
			<input type="email" id="standard-input" placeholder="placeholder" class="o-forms__text" />
			<select class="o-forms__select">
				<option>test</option>
			</select>
			<input type="checkbox">
			<textarea></textarea>
			<button>Reset</button>

			<input type="submit">
		</form>
	</div>
	`;
	insert(html);
}

export {
	insert,
	htmlCode,
	allInputsHtmlCode,
	reset
 };
