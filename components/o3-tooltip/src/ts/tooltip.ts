import {createPopper, Instance} from '@popperjs/core';
import type {TooltipProps} from '../types';

export class ToolTip extends HTMLElement implements TooltipProps {
	content!: string;
	title!: string;
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
		this.content = this.getAttribute('content') as string;
		this.title = this.getAttribute('title') as string;
		this.contentId = this.getAttribute('content-id') as string;
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

	protected initialisePopper(
		targetNode: HTMLElement,
		popperElement: HTMLElement
	) {
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
