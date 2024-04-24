import {ToolTip} from './tooltip';
import {ToggleToolTipProps} from '../types';

export class ToggleToolTip extends ToolTip implements ToggleToolTipProps {
	private _contentWrapper!: HTMLElement;
	private _liveRegionEl!: HTMLElement;
	infoLabel: string;

	constructor() {
		super();
		this.infoLabel = 'information button';
	}

	connectedCallback() {
		super.connectedCallback();
		if (this.getAttribute('info-label')) {
			this.infoLabel = this.getAttribute('info-label') as string;
		}
		console.log('connectedCallback', this.infoLabel);
		this.innerHTML = this._generateMarkup(this.infoLabel);
		this._contentWrapper = this.querySelector(
			'.o3-tooltip-wrapper'
		) as HTMLElement;
		this._liveRegionEl = this.querySelector(
			'.o3-tooltip-content'
		) as HTMLElement;
		this._contentWrapper.style.display = 'none';
		this._targetNode = this.querySelector(
			'.o3-toggletip-target'
		) as HTMLElement;

		this._popperInstance = this.initialisePopper(
			this._targetNode,
			this._contentWrapper
		);
		this.render();
		this._addEventListeners();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._removeEventListeners();
	}

	private _clickHandler = () => {
		if (this._contentWrapper.style.display === 'none') {
			this.render();
			this._contentWrapper.style.display = 'block';
			this.setAttribute('open', '');
			this._addContentInLiveRegion();
			return;
		}
		this._contentWrapper.style.display = 'none';
		this.removeAttribute('open');
		this._removeContentInLiveRegion();
	};

	private _closeOnOutsideClick = (e: Event) => {
		const target = e.target as Node;
		const isTarget = target === this._targetNode;
		const isChild = this.contains(target);
		if (!isChild && !isTarget) {
			this._contentWrapper.style.display = 'none';
			this.removeAttribute('open');
			this._removeContentInLiveRegion();
		}
	};

	private _closeOnEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this._contentWrapper.style.display = 'none';
			this.removeAttribute('open');
			this._removeContentInLiveRegion();
		}
	};

	private _addContentInLiveRegion() {
		// filling with empty divs is important to prevent popper from mispositioning the tooltip
		this._liveRegionEl.innerHTML = `
			<div class="o3-tooltip-content-title">""</div>
			<div class="o3-tooltip-content-body">""</div>	
		`;
		window.setTimeout(() => {
			this._liveRegionEl.innerHTML = `
			<div class="o3-tooltip-content-title">${this.title}</div>
			<div class="o3-tooltip-content-body">${this.content}</div>
			`;
		}, 10);
	}
	private _removeContentInLiveRegion() {
		this._liveRegionEl.innerHTML = '';
	}
	private _addEventListeners() {
		this._targetNode.addEventListener('click', this._clickHandler);
		// Close on outside click
		document.addEventListener('click', this._closeOnOutsideClick);
		// Remove toggletip on ESC
		this.addEventListener('keydown', this._closeOnEsc);
	}

	private _removeEventListeners() {
		this._targetNode.removeEventListener('click', this._clickHandler);
		document.removeEventListener('click', this._closeOnOutsideClick);
		this.removeEventListener('keydown', this._closeOnEsc);
	}

	_generateMarkup(infoLabel: string) {
		// add type="button" to prevent form submission
		const tooltipButtonMarkup = `<button type="button" aria-label="${infoLabel}" class="o3-toggletip-target"></button>`;

		return `
		${tooltipButtonMarkup}
		<div class="o3-tooltip-wrapper">
			<div data-tooltip-arrow></div>
			<div class="o3-tooltip-content" role="status"></div>
		</div>`;
	}
}

customElements.define('o3-tooltip-toggle', ToggleToolTip);

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip-toggle': ToggleToolTip;
	}
}
