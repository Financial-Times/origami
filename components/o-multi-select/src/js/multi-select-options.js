export function handleOptionSelect(optionEl, option, index) {
	if (optionEl.classList.contains('o-multi-select-option__selected')) {
		removeOption.call(this, optionEl, option, index);
	} else {
		addOption.call(this, optionEl, option, index);
	}
}

function removeOption(optionEl, option, index) {
	optionEl.classList.remove('o-multi-select-option__selected');
	optionEl.setAttribute('aria-selected', 'false');
	this.numberOfSelectedOptions--;
	const button = this.selectedOptions.querySelector(`#${option + index}`);
	button.parentElement.remove();
	this._updateState();
}

function addOption(optionEl, option, index) {
	this.numberOfSelectedOptions++;
	optionEl.classList.add('o-multi-select-option__selected');
	optionEl.setAttribute('aria-selected', 'true');
	const {li, button} = createOptionButton(option, index);
	this.selectedOptions.appendChild(li);
	this._updateState();

	button.addEventListener('click', () => {
		li.remove();
		optionEl.classList.remove('o-multi-select-option__selected');
		this.numberOfSelectedOptions--;
		this._updateState();
	});
}

function createOptionButton(option, index) {
	const li = document.createElement('li');
	const button = document.createElement('button');
	button.id = option + index;
	button.setAttribute('aria-label', ` remove ${option} `);
	button.className = 'o-multi-select__selected-options-button';
	button.type = 'button';
	button.innerText = option;
	const span = document.createElement('span');
	span.classList = 'o-icons-icon o-icons-icon--cross';
	button.appendChild(span);
	li.appendChild(button);

	return {li, button};
}

export function createOption(idBase, option, index) {
	const optionEl = document.createElement('div');
	optionEl.setAttribute('role', 'option');
	optionEl.id = `${idBase}-${index}`;
	optionEl.className = 'o-multi-select-option';
	optionEl.setAttribute('aria-selected', 'false');
	optionEl.innerText = option;

	return optionEl;
}
