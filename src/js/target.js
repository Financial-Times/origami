class Target {

	constructor(targetEl) {
		this.targetEl = targetEl;
		this.rectObject = targetEl.getBoundingClientRect();
	}

	get left() {
		return this.rectObject.left;
	}

	get right() {
		return this.rectObject.right;
	}

	get top() {
		return this.rectObject.top;
	}

	get bottom() {
		return this.rectObject.bottom;
	}

	get width() {
		return this.rectObject.width;
	}

	get height() {
		return this.rectObject.height;
	}

	get centrePoint(){
		return { x: this.left + (this.width/2), y: this.top + (this.height/2)};
	}
}

export default Target;
