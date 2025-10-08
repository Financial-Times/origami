import {createPopper, type Instance} from '@popperjs/core';
import type {TooltipProps} from '../types';

export class ToolTip extends HTMLElement implements TooltipProps {
	contentId!: string;
	targetId!: string;

	protected _popperInstance?: Instance;
	protected _targetNode!: HTMLElement;
	protected _isToggleTooltip!: boolean;
	private _mutationObserver?: MutationObserver;
	private _resizeObserver?: ResizeObserver;

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

		this._mutationObserver?.disconnect();
		this._resizeObserver?.disconnect();

		const contentRoot = (this.shadowRoot?.querySelector('[part="content"]') as HTMLElement) ?? this;
		this._mutationObserver = new MutationObserver(() => this.update());
		this._mutationObserver.observe(contentRoot, { childList: true, subtree: true, characterData: true });

		this._resizeObserver = new ResizeObserver(() => this.update());
		this._resizeObserver.observe(this);
	}

	attributeChangedCallback(name: string) {
		this.render(name);
	}

	disconnectedCallback() {
		this._popperInstance?.destroy();
		this._mutationObserver?.disconnect();
		this._resizeObserver?.disconnect();
	}

	async update() {
		await this._popperInstance?.update();
	}

	forceUpdate() {
		this._popperInstance?.forceUpdate?.();
	}

	protected render(name?: string) {
		if (this._popperInstance) {
			this._popperInstance.setOptions((opts) => ({
				...opts,
				placement: this.placement,
			}));
		}

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
			this.forceUpdate();
		}

		if (name && name !== 'title' && name !== 'content') {
			void this.update();
		}
	}

	protected initialisePopper(
		targetNode: HTMLElement,
		popperElement: HTMLElement
	) {
		this._popperInstance = createPopper(targetNode, popperElement, {
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
		return this._popperInstance;
	}
}
