export class ToolTip extends HTMLElement {
	static get observedAttributes() {
		return ['tip-position'];
	}

	constructor() {
		super();
	}
	connectedCallback() {
		console.log('Custom element added to page.');
		this.render();
	}

	disconnectedCallback() {
		console.log('Custom element removed from page.');
	}

	adoptedCallback() {
		console.log('Custom element moved to new page');
	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`Attribute ${name} has changed.`);
	}

	render() {
		const position = this.getAttribute('tip-position');
		console.log(`🚀 ~ position:`, position);
	}
}

customElements.define('o3-tooltip', ToolTip);

// TODO: This can get a bit nasty and we might have compilation issues
declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip': ToolTip;
	}
	namespace JSX {
		interface IntrinsicElements {
			'o3-tooltip': JSX.HTMLAttributes<ToolTip>;
		}
	}
}
