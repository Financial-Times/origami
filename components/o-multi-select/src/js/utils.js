export function handleDropdownMenuOpen() {
	if (!this.open) {
		this.listboxEl.style.display = 'block';
		this.open = true;
		updateCurrentElement.call(this);
	} else {
		this.listboxEl.style.display = 'none';
		this.open = false;
	}
	this.comboEl.setAttribute('aria-expanded', `${this.open}`);
	this._updateState();
}

export function onOptionMouseDown() {
	this.ignoreBlur = true;
}

export function onInputBlur() {
	if (this.ignoreBlur) {
		this.ignoreBlur = false;
		return;
	}

	if (this.open) {
		handleDropdownMenuOpen.call(this);
	}
}

export function onInputKeyDown(event) {
	const {key} = event;
	const numberOfOptions = this.totalNumberOfOptions;

	// handle opening when closed
	if (!this.open) {
		if (
			key === 'ArrowDown' ||
			key === 'ArrowUp' ||
			key === 'Enter' ||
			key === ' '
		) {
			updateCurrentElement.call(this);
			return this.handleListBoxOpen();
		}
	}

	if (event.altKey && key === 'ArrowUp' && this.open) {
		addOptionToList.call(this);
		this.handleListBoxOpen();
		return;
	}

	if (key === 'ArrowUp') {
		if (this.activeIndex !== 0) {
			this.activeIndex--;
		}
	} else if (key === 'ArrowDown') {
		if (this.activeIndex !== numberOfOptions - 1) {
			this.activeIndex++;
		}
	} else if (key === 'PageDown') {
		if (this.activeIndex + 10 > numberOfOptions) {
			this.activeIndex = numberOfOptions - 1;
		} else {
			this.activeIndex += 10;
		}
	} else if (key === 'PageUp') {
		if (this.activeIndex - 10 < 0) {
			this.activeIndex = 0;
		} else {
			this.activeIndex -= 10;
		}
	} else if (key === 'Home') {
		this.activeIndex = 0;
	} else if (key === 'End') {
		this.activeIndex = numberOfOptions - 1;
	}

	if (key === 'Escape' && this.open) {
		this.handleListBoxOpen();
	} else if (key === 'Tab' && this.open) {
		this.handleListBoxOpen();
	} else if (key === 'Enter' || key === ' ') {
		event.preventDefault();
		addOptionToList.call(this);
	}
	updateCurrentElement.call(this);
}

// add current index element in selected items
function addOptionToList() {
	const optionEl = this.multiSelectEl.querySelector(
		`#${this.idBase}-${this.activeIndex}`
	);
	const option = this.options.multiSelectOptions[this.activeIndex];
	this.handleOptionSelect(optionEl, option, this.activeIndex);
}

function updateCurrentElement() {
	this.inputEl.setAttribute(
		'aria-activedescendant',
		`${this.idBase}-${this.activeIndex}`
	);

	const options = this.multiSelectEl.querySelectorAll('[role=option]');
	[...options].forEach(optionEl => {
		optionEl.classList.remove('o-multi-select-option__current');
	});
	options[this.activeIndex].classList.add('o-multi-select-option__current');
}
