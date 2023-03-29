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
	const html = `<form data-o-component="o-forms">
  <label for="fruits" class="o-forms-field">
    <span class="o-forms-title">
      <span class="o-forms-title__main">Select multiple options</span>
    </span>
		<div class="o-forms-input">
			<div class="o-multi-select" data-o-component="o-multi-select">
				<select name="fruits" id="fruits" multiple>
					${options.join('')}
				</select>
			</div>
		</div>
  </label>
</form>`;

	insert(html);
}

export {htmlCode, reset};
