class Target {

	constructor(toggle){
		this.targetEl = toggle.targetEl;
		this.toggles = [];
	}

	addToggle(toggle) {
		this.toggles.push(toggle);
	}

	removeToggle(toggle) {
		const togglePosition = this.toggles.indexOf(toggle);
		this.toggles = this.toggles.slice(0, togglePosition).concat(this.toggles.slice(togglePosition +1));
		if (this.toggles.length === 0) {
			this.open();
		}
	}

	open() {
		this.targetEl.setAttribute('aria-hidden', 'false');
		this.targetEl.classList.add('o-toggle--active');
		/* For every toggle that controls this target, set aria-expanded to true */
		this.toggles.forEach((toggle) => {
			toggle.close();
		});
	}

	close() {
		this.targetEl.setAttribute('aria-hidden', 'true');
		this.targetEl.classList.remove('o-toggle--active');

		/* For every toggle that controls this target, set aria-expanded to true */
		this.toggles.forEach((toggle) => {
			toggle.toggleEl.setAttribute('aria-expanded', 'false');
		});
	}

	toggle(){
		if (this.isOpen()){
			this.close();
		} else {
			this.open();
		}
	}


	isOpen() {
		this.targetEl.classList.contains('o-toggle--active');
	}
};
export default Target;
