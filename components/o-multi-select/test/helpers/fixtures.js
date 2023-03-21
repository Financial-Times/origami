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

function htmlCode(multiSelectOptions) {
	const options = multiSelectOptions.map(option => `<option value="${option}">${option}</option>`);
	const html = `<div class="o-multi-select o-multi-select--core" data-o-component="o-multi-select">
	<span class="o-forms-field">
		<span class="o-forms-title">
			<label class="o-forms-title__main" for="multiple"
				>Multiple select box</label
			>
		</span>
		<select name="multiple" id="multiple" multiple>
			${options.join('')}
		</select>
	</span>
	</div>`;

	insert(html);
}

export {htmlCode, reset};
