class Target {

	constructor(targetEl) {
		this.targetEl = targetEl;
	}

	get leftLimit() {
		return this.targetEl.offsetLeft;
	}

	get rightLimit() {
		return this.targetEl.offsetLeft + this.targetEl.offsetWidth;
	}

	get upperLimit() {
		return this.targetEl.offsetTop;
	}

	get lowerLimit() {
		return this.targetEl.offsetTop + this.targetEl.offsetHeight;
	}

	get centreX(){
		return this.leftLimit + (this.targetEl.offsetWidth/2);
	}

	get centreY(){
		return this.topLimit + (this.targetEl.offsetHeight/2);
	}
}

export default Target;
