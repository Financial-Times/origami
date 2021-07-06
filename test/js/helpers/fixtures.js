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

function htmlSelectCode () {
	const html = `<div id=test>
	<label class="o-forms-field" >
		<span class="o-forms-title">
			<span class="o-forms-title__main">Select your country</span>
		</span>
		<span class="o-forms-input o-forms-input--select o-forms-input--text">
			<div data-o-component="o-autocomplete" class="o-autocomplete">
				<select id="my-autocomplete">
					<option value=""></option>
					<option>Afghanistan</option>
				</select>
			</div>
		</span>
	</label>
	</div>
	`;
	insert(html);
}

function htmlInputCode () {
	const html = `<div id=test>
	<label class="o-forms-field" >
		<span class="o-forms-title">
			<span class="o-forms-title__main">Select your team</span>
		</span>
		<span class="o-forms-input o-forms-input--select o-forms-input--text">
			<div data-o-component="o-autocomplete" class="o-autocomplete">
				<input id="my-autocomplete" type="text" >
			</div>
		</span>
	</label>
	</div>
	`;
	insert(html);
}

export {
	htmlInputCode,
	htmlSelectCode,
	reset
};
