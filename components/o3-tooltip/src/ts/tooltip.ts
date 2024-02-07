import {createPopper, Instance} from '@popperjs/core';
// import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
// import offset from '@popperjs/core/lib/modifiers/offset.js';

export class ToolTip extends HTMLElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['tip-placement'];
	}

	get tipPlacement() {
		return this.getAttribute('tip-placement');
	}
	get targetId() {
		return this.getAttribute('target-id');
	}

	set tipPlacement(value) {
		this.setAttribute('tip-placement', value);
	}

	connectedCallback() {
		const closeButton = this.querySelector('.o3-tooltip-close');
		closeButton.addEventListener('click', this.closeToolTip.bind(this));
		const targetNode = this.getTargetNode();
		const resizeObserver = new ResizeObserver(entries => {
			this.render();
		});

		resizeObserver.observe(targetNode);

		this.popperInstance = createPopper(targetNode, this, {
			placement: this.tipPlacement || 'top',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 16],
					},
				},
			],
		});
		this.render();
	}

	// disconnectedCallback() {
	// 	console.log('Custom element removed from page.');
	// }

	// adoptedCallback() {
	// 	console.log('Custom element moved to new page');
	// }

	attributeChangedCallback(name, oldValue, newValue) {
		this.render();
	}
	popperInstance?: Instance;

	render() {
		this.popperInstance?.setOptions({
			placement: this.tipPlacement,
		});
	}

	getTargetNode() {
		return document.getElementById(this.targetId);
	}
	closeToolTip() {
		this.remove();
	}
}

customElements.define('o3-tooltip', ToolTip);

type CustomElement<T> = Partial<T & DOMAttributes<T> & {children: any}>;

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip': ToolTip;
	}
	namespace JSX {
		interface IntrinsicElements {
			['o3-tooltip']: CustomElement<ToolTip>;
		}
	}
}
