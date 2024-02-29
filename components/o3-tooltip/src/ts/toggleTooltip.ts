import {ToolTip} from './tooltip';
import {ToggleToolTipProps} from '../types';

export class ToggleToolTip extends ToolTip implements ToggleToolTipProps {
	private _contentWrapper!: HTMLElement;

	connectedCallback() {
		super.connectedCallback();
		this.innerHTML = this.generateMarkup(this.title, this.content);
		this._contentWrapper = this.querySelector(
			'.o3-tooltip-wrapper'
		) as HTMLElement;
		this._contentWrapper.style.display = 'none';
		this._targetNode = this.querySelector('.o3-tooltip-tooltip') as HTMLElement;

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
			return;
		}
		this._contentWrapper.style.display = 'none';
		this.removeAttribute('open');
	};

	private _closeOnOutsideClick = (e: Event) => {
		const target = e.target as Node;
		const isTarget = target === this._targetNode;
		const isChild = this.contains(target);
		if (!isChild && !isTarget) {
			this._contentWrapper.style.display = 'none';
			this.removeAttribute('open');
		}
	};

	private _closeOnEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this._contentWrapper.style.display = 'none';
			this.removeAttribute('open');
		}
	};

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

	private generateMarkup(title: string, content: string) {
		const tooltipButtonMarkup = `<button type="button" class="o3-tooltip-tooltip"></button>`;

		return `
		${tooltipButtonMarkup}
		<div class="o3-tooltip-wrapper">
			<div data-tooltip-arrow></div>
			<div class="o3-tooltip-content" role="status">
				${title && `<div class="o3-tooltip-content-title">${title}</div>`}
				<div>${content}</div>
			</div>
		</div>`;
	}
}

customElements.define('o3-tooltip-toggle', ToggleToolTip);

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip-toggle': ToggleToolTip;
	}
}
