import {createPopper, Instance} from '@popperjs/core';
import type {TooltipProps} from '../types';

export class ToolTip extends HTMLElement implements TooltipProps {
	contentId!: string;
	targetId!: string;

	protected _popperInstance?: Instance;
	protected _targetNode!: HTMLElement;
	protected _isToggleTooltip!: boolean;

	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['placement', 'title', 'content'];
	}

	get placement() {
		return this.getAttribute('placement') as TooltipProps['placement'];
	}

	set placement(value) {
		this.setAttribute('placement', value);
	}

	get title() {
		return this.getAttribute('title') as string;
	}

	set title(value) {
		this.setAttribute('title', value);
	}

	get content() {
		return this.getAttribute('content') as string;
	}

	set content(value) {
		this.setAttribute('content', value);
	}

	connectedCallback() {
		this.content = this.getAttribute('content') as string;
		if (this.hasAttribute('title')) {
			this.title = this.getAttribute('title') as string;
		}
		this.contentId = this.getAttribute('content-id') as string;
	}

	attributeChangedCallback(name: string) {
		this.render(name);
	}

	disconnectedCallback() {
		this._popperInstance?.destroy();
	}

	protected render(name?: string) {
		this._popperInstance?.setOptions({
			placement: this.placement,
		});

		if (name === 'title' || name === 'content') {
			const titleEl = this.querySelector('.o3-tooltip-content-title');
			const contentEl = this.querySelector(
				'.o3-tooltip-content-body'
			) as HTMLElement;
			if (titleEl) {
				titleEl.textContent = this.title;
			}
			if (contentEl) {
				contentEl.textContent = this.content;
			}
			if (!this.title) {
				this.setAttribute('no-title', '');
			} else {
				this.removeAttribute('no-title');
			}
		}
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
						rootBoundary: document.body,
					},
				},
				{
					name: 'eventListeners',
					options: {
						scroll: false,
					},
				},
				{
					name: 'flip',
					options: {
						fallbackPlacements: ['top', 'bottom', 'left', 'right'],
						rootBoundary: document.body,
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
