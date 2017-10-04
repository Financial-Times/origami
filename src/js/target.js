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
			// If that was the last/only toggle that controlled this target then ensure
			// this target is open so it doesn't get stuck in the closed position
			this.open();
		}
	}

	open() {
		this.targetEl.setAttribute('aria-hidden', 'false');
		this.targetEl.classList.add('o-toggle--active');
		// Set every toggle that controls this target to be open
		this.toggles.forEach((toggle) => {
			toggle.open();
		});
	}

	close() {
		this.targetEl.setAttribute('aria-hidden', 'true');
		this.targetEl.classList.remove('o-toggle--active');

		// Set every toggle that controls this target to be closed
		this.toggles.forEach((toggle) => {
			toggle.close();
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
		return this.targetEl.classList.contains('o-toggle--active');
	}
}

export default Target;
