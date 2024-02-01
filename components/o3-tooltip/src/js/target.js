class Target {
	constructor(targetEl) {
		this.targetEl = targetEl;
	}

	get offsetTop() {
		return this.targetEl.offsetTop;
	}

	get left() {
		return this.targetEl.getBoundingClientRect().left;
	}

	get right() {
		return this.left + this.width;
	}

	get top() {
		return this.targetEl.getBoundingClientRect().top;
	}

	get bottom() {
		return this.top + this.height;
	}

	get width() {
		return this.targetEl.getBoundingClientRect().width;
	}

	get height() {
		return this.targetEl.getBoundingClientRect().height;
	}

	get centrePoint(){
		return { x: this.left + this.width/2, y: this.top + this.height/2};
	}
}

export default Target;
