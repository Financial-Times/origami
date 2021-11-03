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
			<span data-o-component="o-autocomplete" class="o-autocomplete">
				<select id="my-autocomplete" name="country" required>
					<option value=""></option>
					<option>Afghanistan</option>
				</select>
			</span>
		</span>
	</label>
	</div>
	`;
	insert(html);
}

function invalidHtmlSelectCode () {
	const html = `<div id=test>
	<label class="o-forms-field" >
		<span class="o-forms-title">
			<span class="o-forms-title__main">Select your country</span>
		</span>
		<span class="o-forms-input o-forms-input--select o-forms-input--text">
			<span data-o-component="o-autocomplete" class="o-autocomplete">
				<select name="country" required>
					<option value=""></option>
					<option>Afghanistan</option>
				</select>
			</span>
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
			<span data-o-component="o-autocomplete" class="o-autocomplete">
				<input id="my-autocomplete" type="text" name="country" placeholder="Please enter a country" required>
			</span>
		</span>
	</label>
	</div>
	`;
	insert(html);
}

function invalidHtmlInputCode () {
	const html = `<div id=test>
	<label class="o-forms-field" >
		<span class="o-forms-title">
			<span class="o-forms-title__main">Select your team</span>
		</span>
		<span class="o-forms-input o-forms-input--select o-forms-input--text">
			<span data-o-component="o-autocomplete" class="o-autocomplete">
				<input type="text" name="country" required>
			</span>
		</span>
	</label>
	</div>
	`;
	insert(html);
}

export {
	htmlInputCode,
	invalidHtmlInputCode,
	htmlSelectCode,
	invalidHtmlSelectCode,
	reset,
};
