class Target {
	constructor(targetEl) {
		this.targetEl = targetEl;

		// @deprecated This is not used anywhere in the codebase, seems like we don't need it
		this.rectObject = targetEl.getBoundingClientRect();
	}

	// @deprecated This is not used anywhere in the codebase, seems like we don't need it
	getEdge(edge){
		console.warn('The `getEdge` method is depracated and will be removed in the next major version of o-tooltip');
		const edges = {"top": this.top, "bottom": this.bottom, "right": this.right, "left": this.left};
		return edges[edge];
	}
	// @deprecated ^^^

	get offsetTop() {
		return this.targetEl.offsetTop;
	}

	get left() {
		return this.targetEl.getBoundingClientRect().left - (this.targetEl.offsetParent && this.targetEl.offsetParent.getBoundingClientRect().left);
	}

	get right() {
		return this.left + this.width;
	}

	get top() {
		return this.targetEl.getBoundingClientRect().top - (this.targetEl.offsetParent && this.targetEl.offsetParent.getBoundingClientRect().top);
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
		return { x: this.left + (this.width/2), y: this.top + (this.height/2)};
	}
}

export default Target;
