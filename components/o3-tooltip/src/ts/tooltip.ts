import {createPopper, Instance} from '@popperjs/core';
import type {TooltipProps} from '../types';

export class ToolTip extends HTMLElement implements TooltipProps {
	content!: string;
	contentId!: string;
	targetId!: string;
	renderOnOpen!: boolean;

	private _popperInstance?: Instance;
	private _closeButton?: HTMLElement | null;
	private _targetNode!: HTMLElement;
	private _arrow!: HTMLElement;

	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['placement'];
	}

	get placement() {
		return this.getAttribute('placement') as TooltipProps['placement'];
	}

	set placement(value) {
		this.setAttribute('placement', value);
	}

	connectedCallback() {
		this.targetId = this.getAttribute('target-id') as string;
		this.renderOnOpen = this.hasAttribute('render-on-open');
		this._closeButton = this.querySelector('.o3-tooltip-close');
		this._arrow = this.querySelector('[data-tooltip-arrow]') as HTMLElement;
		if (!this.renderOnOpen && this._closeButton) {
			this._closeButton.remove();
		}

		this._targetNode = this.getTargetNode();
		this._popperInstance = this.initialisePopper(this._targetNode);
		this.render();
		this.addEventListeners();
	}

	attributeChangedCallback() {
		this.render();
	}

	disconnectedCallback() {
		this.removeEventListeners();
		this._popperInstance?.destroy();
	}

	private render() {
		this._popperInstance?.setOptions({
			placement: this.placement,
		});
	}

	private getTargetNode() {
		const targetNode = document.getElementById(this.targetId);
		if (!targetNode) {
			throw new Error(
				'Target node not found. o3-tooltip requires a target node id to position itself against the target element.'
			);
		}
		return targetNode as HTMLElement;
	}

	private initialisePopper(targetNode: HTMLElement) {
		return createPopper(targetNode, this, {
			placement: this.placement || 'top',
			modifiers: [
				{
					name: 'preventOverflow',
					options: {
						altAxis: true,
					},
				},
				{
					name: 'flip',
					options: {
						fallbackPlacements: ['top', 'bottom', 'left', 'right'],
					},
				},
				{
					name: 'arrow',
					options: {
						element: this._arrow,
					},
				},
				{
					name: 'offset',
					options: {
						offset: [0, 16],
					},
				},
			],
			onFirstUpdate: () => {
				if (!this.renderOnOpen) this.style.display = 'none';
			},
		});
	}

	private _eventListeners = {
		closeButton: {
			click: () => {
				this.remove();
			},
		},
		targetNode: {
			mouseEnter: () => (this.style.display = 'block'),
			mouseLeave: () => (this.style.display = 'none'),
			click: () =>
				this.style.display === 'none'
					? (this.style.display = 'block')
					: (this.style.display = 'none'),
			focusIn: () => (this.style.display = 'block'),
			focusOut: () => (this.style.display = 'none'),
		},
	};

	private addEventListeners() {
		if (this._closeButton) {
			this._closeButton.addEventListener(
				'click',
				this._eventListeners.closeButton.click
			);
		} else {
			this._targetNode.addEventListener(
				'mouseenter',
				this._eventListeners.targetNode.mouseEnter
			);
			this._targetNode.addEventListener(
				'mouseleave',
				this._eventListeners.targetNode.mouseLeave
			);
			this._targetNode.addEventListener(
				'click',
				this._eventListeners.targetNode.click
			);
			this._targetNode.addEventListener(
				'focusin',
				this._eventListeners.targetNode.focusIn
			);
			this._targetNode.addEventListener(
				'focusout',
				this._eventListeners.targetNode.focusOut
			);
		}
	}

	private removeEventListeners() {
		if (this._closeButton) {
			this._closeButton.removeEventListener(
				'click',
				this._eventListeners.closeButton.click
			);
		} else {
			this._targetNode.removeEventListener(
				'mouseenter',
				this._eventListeners.targetNode.mouseEnter
			);
			this._targetNode.removeEventListener(
				'mouseleave',
				this._eventListeners.targetNode.mouseLeave
			);
			this._targetNode.removeEventListener(
				'click',
				this._eventListeners.targetNode.click
			);
			this._targetNode.removeEventListener(
				'focusin',
				this._eventListeners.targetNode.focusIn
			);
			this._targetNode.removeEventListener(
				'focusout',
				this._eventListeners.targetNode.focusOut
			);
		}
	}
}

customElements.define('o3-tooltip', ToolTip);

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip': ToolTip;
	}
}
