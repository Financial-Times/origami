import {createPopper, Instance} from '@popperjs/core';
import type {TooltipProps} from '../types';

export class ToolTip extends HTMLElement implements TooltipProps {
	content!: string;
	contentId!: string;
	targetId!: string;

	protected _popperInstance?: Instance;
	protected _targetNode!: HTMLElement;
	protected _isToggleTooltip!: boolean;

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
		this._targetNode = this.getTargetNode();
		this._popperInstance = this.initialisePopper(this._targetNode);
		this.render();
	}

	attributeChangedCallback() {
		this.render();
	}

	disconnectedCallback() {
		this._popperInstance?.destroy();
	}

	protected render() {
		this._popperInstance?.setOptions({
			placement: this.placement,
		});
	}

	protected getTargetNode() {
		this.targetId = this.getAttribute('target-id') as string;
		let targetNode = document.getElementById(this.targetId);
		this._isToggleTooltip = this.tagName === 'O3-TOOLTIP-TOGGLE';

		// if toggle tooltip get target node from the markup
		if (this._isToggleTooltip) {
			targetNode = this.querySelector('.o3-tooltip-info');
		}

		if (!targetNode) {
			throw new Error(
				'Target node not found. o3-tooltip requires a target node id to position itself against the target element.'
			);
		}
		return targetNode as HTMLElement;
	}

	protected initialisePopper(
		targetNode: HTMLElement,
		popperElement: HTMLElement = this
	) {
		if (this._isToggleTooltip) {
			popperElement = this.querySelector('.o3-tooltip-wrapper') as HTMLElement;
		}
		return createPopper(targetNode, popperElement, {
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
					name: 'offset',
					options: {
						offset: [0, 16],
					},
				},
			],
		});
	}
}
