import {createPopper, Instance} from '@popperjs/core';
import type {TooltipProps} from '../types';
// import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js';
// import offset from '@popperjs/core/lib/modifiers/offset.js';

export class ToolTip extends HTMLElement implements TooltipProps {
	content!: string;
	contentId!: string;
	targetId!: string;

	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['tip-placement'];
	}

	get tipPlacement() {
		return this.getAttribute('tip-placement') as TooltipProps['tipPlacement'];
	}

	set tipPlacement(value) {
		this.setAttribute('tip-placement', value);
	}

	connectedCallback() {
		this.targetId = this.getAttribute('target-id') as string;

		const closeButton = this.querySelector('.o3-tooltip-close');
		closeButton?.addEventListener('click', this.closeToolTip.bind(this));
		const targetNode = this.getTargetNode();
		// const resizeObserver = new ResizeObserver(entries => {
		// 	this.render();
		// });

		// resizeObserver.observe(targetNode);
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
			onFirstUpdate: () => {
				const animationPosition = this.tipPlacement?.includes('-')
					? this.tipPlacement.split('-')[0]
					: this.tipPlacement;
				const contentWrapper = this.querySelector(
					'.o3-tooltip-wrapper'
				) as HTMLElement;
				contentWrapper.style.animation = `bounce-${animationPosition} 2s ease`;
			},
		});
		this.render();
	}

	// disconnectedCallback() {
	// 	console.log('Custom element removed from page.');
	// }

	// adoptedCallback() {
	// 	console.log('Custom element moved to new page');
	// }

	attributeChangedCallback() {
		this.render();
	}
	popperInstance?: Instance;

	render() {
		this.popperInstance?.setOptions({
			placement: this.tipPlacement,
		});
	}

	private getTargetNode() {
		return document.getElementById(this.targetId) as HTMLElement;
	}
	closeToolTip() {
		this.remove();
		this.popperInstance?.destroy();
	}
}

customElements.define('o3-tooltip', ToolTip);

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip': ToolTip;
	}
}
