class Target {

	constructor(targetEl) {
		this.targetEl = targetEl;
		this.rectObject = targetEl.getBoundingClientRect();
	}

	refreshRect() {
		this.rectObject = this.targetEl.getBoundingClientRect();
	}

	hasMoved(){
		let newRect = this.targetEl.getBoundingClientRect();
		return (this.top !== newRect.top ||
			this.bottom !== newRect.bottom ||
			this.left !== newRect.left ||
			this.right !== newRect.right);
	}

	getEdge(edge){
		const edges = {"top": this.top, "bottom": this.bottom, "right": this.right, "left": this.left};
		return edges[edge];
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
