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

const coreHtml = `<div class="o-form o-multi-select o-multi-select--core">
<span class="o-forms-field">
	<span class="o-forms-title">
		<label class="o-forms-title__main" for="multiple"
			>Multiple select box</label
		>
	</span>

	<span class="o-forms-input o-forms-input--select">
		<select name="multiple" id="multiple" multiple>
			<option value="apple">apple</option>
			<option value="banana">banana</option>
		</select>
	</span>
</span>
</div>`;

const inputHtml = `<span class="o-forms-field">
<span class="o-forms-title">
	<label
		class="o-forms-title__main"
		for="multiple-enhanced"
		id="o-multi-select-label"
		>Multiple select box</label
	>
</span>
</span>`;
const selectedOptionsHtml = `<ul
class="o-multi-select__selected-options"
id="o-multi-select-selected"
></ul>`;
const multiselecInput = `<div
class="o-multi-select__input"
id="o-multi-select__input"
name="multiple-enhanced"
role="combobox"
aria-activedescendant=""
aria-labelledby="o-multi-select-label o-multi-select-selected"
aria-haspopup="listbox"
aria-expanded="false"
aria-owns="o-multi-select-listbox"
tabindex="0"
>
<span class="o-multi-select__input-text"> Click to select options </span>
</div>`;
const multiselecListBox = `<div
class="o-multi-select__dropdown-menu"
id="o-multi-select-listbox"
role="listbox"
aria-label="multi select options"
aria-multiselectable="true"
tabindex="-1"
></div>`;
const enhancedHtml = `<div class="o-form o-multi-select o-multi-select--enhanced">
${inputHtml}
${selectedOptionsHtml}
<div class="o-multi-select__input-wrapper">
	${multiselecInput}
</div>
${multiselecListBox}
</div>`;

function htmlCode() {
	const html = `<div class="o-multi-select" data-o-component="o-multi-select">
	${coreHtml}
	${enhancedHtml}
</div>
	`;
	insert(html);
}

function htmlCodeWithOptionsDataATtributes() {
	const html = `<div class="o-multi-select" data-o-component="o-multi-select" data-o-multi-select-options="apple, banana">
	${coreHtml}
	${enhancedHtml}
</div>
	`;
	insert(html);
}

export {htmlCode, htmlCodeWithOptionsDataATtributes, reset};
